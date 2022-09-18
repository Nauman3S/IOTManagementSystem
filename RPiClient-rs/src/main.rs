// paho-mqtt/examples/async_subscribe.rs
// This is a Paho MQTT Rust client, sample application.
//
//! This application is an MQTT subscriber using the asynchronous client
//! interface of the Paho Rust client library.
//! It also monitors for disconnects and performs manual re-connections.
//!
//! The sample demonstrates:
//!   - An async/await subscriber
//!   - Connecting to an MQTT server/broker.
//!   - Subscribing to a topic
//!   - Receiving messages from an async stream.
//!   - Handling disconnects and attempting manual reconnects.
//!   - Using a "persistent" (non-clean) session so the broker keeps
//!     subscriptions and messages through reconnects.
//!   - Last will and testament
//!
#![allow(unused)]
use futures::{channel::mpsc::Receiver, executor::block_on, stream::StreamExt};
use mqtt::{AsyncClient, Message, QOS_1};
use paho_mqtt as mqtt;
use rand::distributions::{Alphanumeric, DistString};
use reqwest::Request;
use std::fs;
use std::fs::File;
use std::io;
use std::io::copy;
use std::io::prelude::*;
use std::path::Path;
use std::process::Command;
use std::{env, fmt::format, process, time::Duration};
// use std::time::Duration;
use tokio::{task, time}; // 1.3.0
                         // use tokio::prelude::*;

// use async_std::fs::File;
// use async_std::prelude::*;
extern crate reqwest;
use reqwest::Client;
extern crate mac_address;
use mac_address::get_mac_address;
pub fn get_MAC() -> String {
    match get_mac_address() {
        Ok(Some(ma)) => {
            // println!("MAC addr = {}", ma.to_string().replace(":", ""));
            ma.to_string().replace(":", "")
        }
        Ok(None) => return "None".to_string(),
        Err(e) => return "None".to_string(),
    }
}

async fn download_file(url: &str, fl: &str) -> Result<(), reqwest::Error> {
    let target = url;
    let response = reqwest::get(target).await?;

    let path = Path::new(fl);

    let mut file = match File::create(&path) {
        Err(why) => panic!("couldn't create {}", why),
        Ok(file) => file,
    };
    let content = response.bytes().await?;
    file.write_all(&content);

    Ok(())
}

async fn work1(cli: AsyncClient) {
    loop {
        std::thread::sleep(Duration::from_secs(5));
        // println!("HI1");
        // println!("Publishing a message on the topic 'test'");
        let msg = mqtt::Message::new("iotm/data", "Hello Rust MQTT world!", mqtt::QOS_1);
        cli.publish(msg);
    }
}
async fn heartbeat(cli: AsyncClient) {
    loop {
        std::thread::sleep(Duration::from_secs(5));
        println!("ONLINE=(DEVICE_MAC: {})", get_MAC());
        let msg = mqtt::Message::new(
            format!("{}{}", "iotm-sys/device/heartbeat/", get_MAC()),
            get_MAC(),
            mqtt::QOS_1,
        );
        cli.publish(msg);
    }
}

/////////////////////////////////////////////////////////////////////////////
#[tokio::main]
async fn main() {
    // Initialize the logger from the environment
    env_logger::init();

    let host = env::args()
        .nth(1)
        .unwrap_or_else(|| "tcp://44.195.192.158:1883".to_string());

    // Create the client. Use an ID for a persistent session.
    // A real system should try harder to use a unique ID.
    let create_opts = mqtt::CreateOptionsBuilder::new()
        .server_uri(host)
        .client_id(format!("{}{}", "rpiclient-", get_MAC().to_lowercase()))
        .finalize();

    // Create the client connection
    let mut cli = mqtt::AsyncClient::new(create_opts).unwrap_or_else(|e| {
        println!("Error creating the client: {:?}", e);
        process::exit(1);
    });

    if let Err(err) = block_on(async {
        // Get message stream before connecting.
        let mut strm = cli.get_stream(25);

        // Define the set of options for the connection
        let lwt = mqtt::Message::new("test", "Async subscriber lost connection", mqtt::QOS_1);

        let conn_opts = mqtt::ConnectOptionsBuilder::new()
            .keep_alive_interval(Duration::from_secs(30))
            .mqtt_version(mqtt::MQTT_VERSION_3_1_1)
            .clean_session(false)
            .will_message(lwt)
            .finalize();

        // Make the connection to the broker
        println!("Connecting to the MQTT server...");
        cli.connect(conn_opts).await?;

        println!("Subscribing to the Device OS topics");
        cli.subscribe("iotm-sys/device/osug/all", QOS_1).await;
        cli.subscribe(format!("{}{}", "iotm-sys/device/osug/", get_MAC()), QOS_1)
            .await;

        println!("Subscribing to the Firmware topics");
        cli.subscribe("iotm-sys/device/firmware/all", QOS_1).await;
        cli.subscribe(
            format!("{}{}", "iotm-sys/device/firmware/", get_MAC()),
            QOS_1,
        );
        cli.subscribe(format!("{}{}", "iotm-sys/device/config/", get_MAC()), QOS_1);
        // Just loop on incoming messages.
        println!("Waiting for messages...");

        // Note that we're not providing a way to cleanly shut down and
        // disconnect. Therefore, when you kill this app (with a ^C or
        // whatever) the server will get an unexpected drop and then
        // should emit the LWT message.
        let cli_pub = cli.clone();
        let cli_heartbeat = cli.clone();
        let tasks = vec![
            tokio::spawn(async move { work1(cli_pub).await }),
            tokio::spawn(async move { heartbeat(cli_heartbeat).await }),
            tokio::spawn(async move {
                loop {
                    if let Some(msg_opt) = strm.next().await {
                        if let Some(msg) = msg_opt {
                            println!("MSG={}", msg.to_string());
                            let data_p = msg.to_string();
                            //Device OS Related Topics
                            if msg.to_string().contains("iotm-sys/device/osug/all") {
                                println!("Global upgrade instructions");
                                let mut os_upgrade = Command::new("./upgradeOS.sh");
                                os_upgrade.arg("&");
                                os_upgrade.status().expect("process failed to execute");
                            } else if msg.to_string().contains("iotm-sys/device/osug/")
                                && msg.to_string().contains(&get_MAC())
                            {
                                println!("Global upgrade instructions with MAC");
                                let mut os_upgrade = Command::new("./upgradeOS.sh");
                                os_upgrade.arg("&");
                                os_upgrade.spawn().expect("process failed to execute");
                            }
                            //Device OS Related Topics/////////////////////////
                            ////Device Firmware Related Topics
                            else if msg.to_string().contains("iotm-sys/device/firmware/")
                                && msg.to_string().contains(&get_MAC())
                            {
                                //payload url;filename
                                println!("device firmware with MAC");
                                let data = data_p.split(" ").nth(1).unwrap();
                                println!("data::  {}", data);

                                let data_link = data.split(";").nth(0).unwrap();
                                let flname = data.split(";").nth(1).unwrap();
                                println!("link={} flname={}", data_link, flname);
                                download_file(&data_link.to_string(), &flname.to_string()).await;
                            } else if msg.to_string().contains("iotm-sys/device/firmware/all") {
                                println!("device firmware all");
                                let data = data_p.split(" ").nth(1).unwrap();
                                println!("data::  {}", data);

                                let data_link = data.split(";").nth(0).unwrap();
                                let flname = data.split(";").nth(1).unwrap();
                                println!("link={} flname={}", data_link, flname);
                                download_file(&data_link.to_string(), &flname.to_string()).await;
                            }
                            ////Device Firmware Related Topics
                            // Device Config Topics
                            else if msg.to_string().contains("iotm-sys/device/config/")
                                && msg.to_string().contains(&get_MAC())
                            {
                                let data = data_p.split(" ").nth(1).unwrap();
                                if data.contains("command") {
                                    let cmd = data.split(";").nth(1).unwrap();

                                    let mut output = Command::new(cmd)
                                        .output()
                                        .expect("command failed to execute");

                                    // println!("RES {}", String::from_utf8_lossy(&output.stdout));
                                    let op = String::from_utf8_lossy(&output.stdout);
                                    let msg = mqtt::Message::new(
                                        format!("{}{}", "iotm-sys/device/logs/", get_MAC()),
                                        op.to_string(),
                                        mqtt::QOS_1,
                                    );
                                    cli.publish(msg);
                                } else if data.contains("logs=stdout") {
                                    let data =
                                        fs::read_to_string("/home/pi/RPiClient-rs/logs/stdout.log")
                                            .expect("Unable to read file");
                                            println!("STDOUT HERE");
                                            println!("{}",data);
                                    let msg = mqtt::Message::new(
                                        format!("{}{}", "iotm-sys/device/logs/", get_MAC()),
                                        data.to_string(),
                                        mqtt::QOS_1,
                                    );
                                    cli.publish(msg);
                                } else if data.contains("logs=stderr") {
                                    let data =
                                        fs::read_to_string("/home/pi/RPiClient-rs/logs/stderr.log")
                                            .expect("Unable to read file");
                                    println!("{}",data);
                                    let msg = mqtt::Message::new(
                                        format!("{}{}", "iotm-sys/device/logs/", get_MAC()),
                                        data.to_string(),
                                        mqtt::QOS_1,
                                    );
                                    cli.publish(msg);
                                } else if data.contains("logs=update-status") {
                                    println!("UPDATE STATUS");
                                    let data =
                                        fs::read_to_string("/home/pi/RPiClient-rs/logs/upgradeOP.txt")
                                            .expect("Unable to read file");
                                            println!("{}",data);
                                    let msg = mqtt::Message::new(
                                        format!("{}{}", "iotm-sys/device/logs/", get_MAC()),
                                        data.to_string(),
                                        mqtt::QOS_1,
                                    );
                                    cli.publish(msg);
                                }
                            }
                        } else {
                            // A "None" means we were disconnected. Try to reconnect...
                            println!("Lost connection. Attempting reconnect.");
                            while let Err(err) = cli.reconnect().await {
                                println!("Error reconnecting: {}", err);
                                // For tokio use: tokio::time::delay_for()
                                async_std::task::sleep(Duration::from_millis(1000)).await;
                            }
                        }
                    }
                }
            }),
        ];

        futures::future::join_all(tasks).await;

        // Explicit return type for the async block
        Ok::<(), mqtt::Error>(())
    }) {
        eprintln!("{}", err);
    }
}
