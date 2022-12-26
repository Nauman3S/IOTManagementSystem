#![allow(unused)]
use futures::{ channel::mpsc::Receiver, executor::block_on, stream::StreamExt };
use mqtt::{ AsyncClient, Message, QOS_1 };
use paho_mqtt as mqtt;
use rand::distributions::{ Alphanumeric, DistString };
use reqwest::Request;
use std::fs;
use std::fs::File;
use std::io;
// use serde_json::{ Result, Value };

use serde::{ Deserialize, Serialize };
use std::io::copy;
use std::io::prelude::*;
use std::path::Path;
use std::process::Command;
use std::{ env, fmt::format, process, time::Duration };
// use std::time::Duration;
use tokio::{ task, time }; // 1.3.0
// use tokio::prelude::*;

// use async_std::fs::File;
// use async_std::prelude::*;
extern crate reqwest;
use reqwest::Client;
extern crate mac_address;
use mac_address::get_mac_address;

// use std::fs::{ self, File };
use std::io::Write;
// use std::path::Path;
use base64_stream::FromBase64Writer;

//
// use crate::io::Split;
// extern crate shell_words;
extern crate shell_words;

pub fn get_MAC() -> String {
    match get_mac_address() {
        Ok(Some(ma)) => {
            // println!("MAC addr = {}", ma.to_string().replace(":", ""));
            ma.to_string().replace(":", "")
        }
        Ok(None) => {
            return "None".to_string();
        }
        Err(e) => {
            return "None".to_string();
        }
    }
}

async fn download_file(url: &str, fl: &str) -> Result<(), anyhow::Error> {
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

async fn perform_ota(url: &str, fl: &str) -> Result<(), anyhow::Error> {
    let target = url;
    let response = reqwest::get(target).await?;

    let path = Path::new(fl);

    let mut file = match File::create(&path) {
        Err(why) => panic!("couldn't create {}", why),
        Ok(file) => file,
    };
    let content = response.bytes().await?;
    file.write_all(&content);
    let mut ot_upgrade = Command::new("./ota.sh");
    ot_upgrade.arg("&");
    ot_upgrade.status().expect("process failed to execute");

    Ok(())
}

async fn work1(cli: AsyncClient) {
    loop {
        std::thread::sleep(Duration::from_secs(5));
        // println!("HI1");
        // println!("Publishing a message on the topic 'test'");
        let msg = mqtt::Message::new("iotm/data", "Hello Rust MQTT worldOTA!", mqtt::QOS_1);
        cli.publish(msg);
    }
}

#[derive(Serialize, Deserialize)]
struct HeartBeat {
    macAddress: String,
    status: String,
}

#[derive(Serialize, Deserialize)]
struct Logger {
    macAddress: String,
    logs: String,
}

async fn heartbeat(cli: AsyncClient) {
    println!("Device ONLINE=(DEVICE_MAC: {})", get_MAC());
    let hb_data = HeartBeat {
        macAddress: get_MAC().to_owned(),
        status: "online".to_owned(),
    };

    loop {
        std::thread::sleep(Duration::from_secs(5));

        let msg = mqtt::Message::new(
            format!("{}{}", "iotm-sys/device/heartbeat/", get_MAC()),
            serde_json::to_string(&hb_data).unwrap(),
            mqtt::QOS_1
        );
        cli.publish(msg);
    }
}

/////////////////////////////////////////////////////////////////////////////
#[tokio::main]
async fn main() {
    // Initialize the logger from the environment
    env_logger::init();

    let host = env
        ::args()
        .nth(1)
        .unwrap_or_else(|| "tcp://50.19.43.139:1883".to_string());

    // Create the client. Use an ID for a persistent session.
    // A real system should try harder to use a unique ID.
    let create_opts = mqtt::CreateOptionsBuilder
        ::new()
        .server_uri(host)
        .client_id(format!("{}{}", "rpiclient-", get_MAC().to_lowercase()))
        .finalize();

    // Create the client connection
    let mut cli = mqtt::AsyncClient::new(create_opts).unwrap_or_else(|e| {
        println!("Error creating the client: {:?}", e);
        process::exit(1);
    });

    if
        let Err(err) = block_on(async {
            // Get message stream before connecting.
            let mut strm = cli.get_stream(25);

            // Define the set of options for the connection
            let lwt = mqtt::Message::new("test", "Async subscriber lost connection", mqtt::QOS_1);

            let conn_opts = mqtt::ConnectOptionsBuilder
                ::new()
                .keep_alive_interval(Duration::from_secs(30))
                .mqtt_version(mqtt::MQTT_VERSION_3_1_1)
                .clean_session(false)
                .will_message(lwt)
                .user_name("device")
                .password("device")
                .finalize();

            // Make the connection to the broker
            println!("Connecting to the MQTT server...");
            cli.connect(conn_opts).await?;

            println!("Subscribing to the Device OS topics");
            cli.subscribe("iotm-sys/device/osug/all", QOS_1).await;
            cli.subscribe(format!("{}{}", "iotm-sys/device/osug/", get_MAC()), QOS_1).await;

            println!("Subscribing to the Firmware topics");
            cli.subscribe("iotm-sys/device/firmware/file/all", QOS_1).await;
            cli.subscribe(format!("{}{}", "iotm-sys/device/firmware/file/", get_MAC()), QOS_1);
            cli.subscribe("iotm-sys/device/firmware/script/all", QOS_1).await;
            cli.subscribe(format!("{}{}", "iotm-sys/device/firmware/script/", get_MAC()), QOS_1);
            cli.subscribe("iotm-sys/device/firmware/url/all", QOS_1).await;
            cli.subscribe(format!("{}{}", "iotm-sys/device/firmware/url/", get_MAC()), QOS_1);
            cli.subscribe("iotm-sys/device/client/url/all", QOS_1).await;
            cli.subscribe(format!("{}{}", "iotm-sys/device/client/url/", get_MAC()), QOS_1);
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
                                if msg.topic().contains("iotm-sys/device/osug/all") {
                                    println!("Global upgrade instructions");
                                    let mut os_upgrade = Command::new("./upgradeOS.sh");
                                    os_upgrade.arg("&");
                                    os_upgrade.status().expect("process failed to execute");
                                } else if
                                    msg.topic().contains("iotm-sys/device/osug/") &&
                                    msg.topic().contains(&get_MAC())
                                {
                                    println!("Global upgrade instructions with MAC");
                                    let mut os_upgrade = Command::new("./upgradeOS.sh");
                                    os_upgrade.arg("&");
                                    os_upgrade.spawn().expect("process failed to execute");
                                } else if
                                    //Device OS Related Topics/////////////////////////
                                    ////Device Firmware Related Topics
                                    msg.topic().contains("iotm-sys/device/firmware/file") &&
                                    msg.topic().contains(&get_MAC())
                                {
                                    //payload url;filename
                                    println!("device firmware with MAC");
                                    let data = msg.payload_str();
                                    // println!("data::  {}", data);
                                    println!("topic::  {}", msg.topic());
                                    let flname = "temp";
                                    let data_pl = data.split(",").nth(1).unwrap();
                                    let data_typ = data.split(",").nth(0).unwrap();
                                    println!("Data Type={}", data_typ);

                                    let mut flext = "";
                                    if data_typ.contains("text") {
                                        flext = "txt";
                                    } else if data_typ.contains("pdf") {
                                        flext = "pdf";
                                    } else if data_typ.contains("x-tar") {
                                        flext = "tar";
                                    } else if data_typ.contains("x-sh") {
                                        flext = "sh";
                                    } else {
                                        flext = "unknown";
                                    }
                                    let flnameN = format!("decoded_ouput.{}", flext.to_owned());
                                    println!("flname={} ", flname);

                                    println!("flext={} dataTYP={}", flext, data_typ);

                                    let file_path = Path::new("data").join(flnameN);
                                    let test_data = File::create(file_path.as_path()).unwrap();
                                    println!("{:?}", test_data);
                                    let mut writer = FromBase64Writer::new(test_data);
                                    writer.write_all(data_pl.as_bytes()).unwrap();
                                    writer.flush().unwrap();
                                    let logger_data = Logger {
                                        macAddress: get_MAC().to_owned(),
                                        logs: "Firmware File(s) Received by the client.".to_owned(),
                                    };
                                    let msg = mqtt::Message::new(
                                        format!("{}{}", "iotm-sys/device/logs/", get_MAC()),
                                        serde_json::to_string(&logger_data).unwrap(),
                                        mqtt::QOS_1
                                    );
                                    cli.publish(msg);
                                } else if msg.topic().contains("iotm-sys/device/firmware/file/all") {
                                    //payload url;filename
                                    println!("device firmware with MAC");
                                    let data = msg.payload_str();
                                    // println!("data::  {}", data);
                                    println!("topic::  {}", msg.topic());
                                    let flname = "temp";
                                    let data_pl = data.split(",").nth(1).unwrap();
                                    let data_typ = data.split(",").nth(0).unwrap();
                                    println!("Data Type={}", data_typ);

                                    let mut flext = "";
                                    if data_typ.contains("text") {
                                        flext = "txt";
                                    } else if data_typ.contains("pdf") {
                                        flext = "pdf";
                                    } else if data_typ.contains("x-tar") {
                                        flext = "tar";
                                    } else if data_typ.contains("x-sh") {
                                        flext = "sh";
                                    } else {
                                        flext = "unknown";
                                    }
                                    let flnameN = format!("decoded_ouput.{}", flext.to_owned());
                                    println!("flname={} ", flname);

                                    println!("flext={} dataTYP={}", flext, data_typ);

                                    let file_path = Path::new("data").join(flnameN);
                                    let test_data = File::create(file_path.as_path()).unwrap();
                                    println!("{:?}", test_data);
                                    let mut writer = FromBase64Writer::new(test_data);
                                    writer.write_all(data_pl.as_bytes()).unwrap();
                                    writer.flush().unwrap();
                                    let logger_data = Logger {
                                        macAddress: get_MAC().to_owned(),
                                        logs: "Firmware File(s) Received by the client.".to_owned(),
                                    };
                                    let msg = mqtt::Message::new(
                                        format!("{}{}", "iotm-sys/device/logs/", get_MAC()),
                                        serde_json::to_string(&logger_data).unwrap(),
                                        mqtt::QOS_1
                                    );
                                    cli.publish(msg);
                                } else if
                                    msg.topic().contains("iotm-sys/device/firmware/script") &&
                                    msg.topic().contains(&get_MAC())
                                {
                                    //payload url;filename
                                    println!("device firmware with MAC");
                                    let data = msg.payload_str();
                                    println!("data::  {}", data);
                                    println!("topic::  {}", msg.topic());

                                    let flname = "user-script.sh";
                                    // let data = data.split("*****").nth(1).unwrap();
                                    println!("flname={} data={}", flname, data);
                                    let mut writer = File::create(flname).unwrap();
                                    write!(writer, "#!/bin/sh\n{}", data);

                                    let mut output = Command::new("sudo")
                                        .args(["service", "RPiClient-rs-user-script", "restart"])
                                        .output()
                                        .expect("command failed to execute");
                                    let op = String::from_utf8_lossy(&output.stdout);
                                    // println!("{}", op.to_string());
                                    let logger_data = Logger {
                                        macAddress: get_MAC().to_owned(),
                                        logs: op.to_string(),
                                    };
                                    let msg = mqtt::Message::new(
                                        format!("{}{}", "iotm-sys/device/logs/", get_MAC()),
                                        serde_json::to_string(&logger_data).unwrap(),
                                        mqtt::QOS_1
                                    );
                                    cli.publish(msg);
                                } else if
                                    msg.topic().contains("iotm-sys/device/firmware/script/all")
                                {
                                    //payload url;filename
                                    println!("device firmware with MAC");
                                    let data = msg.payload_str();
                                    println!("data::  {}", data);
                                    println!("topic::  {}", msg.topic());

                                    let flname = "user-script.sh";
                                    // let data = data.split("*****").nth(1).unwrap();
                                    println!("flname={} data={}", flname, data);
                                    let mut writer = File::create(flname).unwrap();
                                    write!(writer, "#!/bin/sh\n{}", data);
                                    let mut output = Command::new("sudo")
                                        .args(["service", "RPiClient-rs-user-script", "restart"])
                                        .output()
                                        .expect("command failed to execute");
                                    let op = String::from_utf8_lossy(&output.stdout);
                                    // println!("{}", op.to_string());
                                    let logger_data = Logger {
                                        macAddress: get_MAC().to_owned(),
                                        logs: op.to_string(),
                                    };
                                    let msg = mqtt::Message::new(
                                        format!("{}{}", "iotm-sys/device/logs/", get_MAC()),
                                        serde_json::to_string(&logger_data).unwrap(),
                                        mqtt::QOS_1
                                    );
                                    cli.publish(msg);
                                } else if
                                    msg.topic().contains("iotm-sys/device/firmware/url") &&
                                    msg.topic().contains(&get_MAC())
                                {
                                    //payload url;filename
                                    println!("device firmware with MAC");
                                    let data = msg.payload_str();
                                    println!("data::  {}", data);

                                    let flname = data.split("-").nth(6).unwrap();
                                    // let data_link = data.split(";").nth(0).unwrap();
                                    // let flname = data.split(";").nth(1).unwrap();
                                    println!("link={} flname={}", data, flname);
                                    let full_path = format!("data/{}", flname.to_owned());
                                    download_file(&data.to_string(), &full_path.to_string()).await;
                                    let logger_data = Logger {
                                        macAddress: get_MAC().to_owned(),
                                        logs: "Firmware File(s) Downloaded by the client.".to_owned(),
                                    };
                                    let msg = mqtt::Message::new(
                                        format!("{}{}", "iotm-sys/device/logs/", get_MAC()),
                                        serde_json::to_string(&logger_data).unwrap(),
                                        mqtt::QOS_1
                                    );
                                    cli.publish(msg);
                                } else if msg.topic().contains("iotm-sys/device/firmware/url/all") {
                                    println!("device firmware all");
                                    let data = msg.payload_str();
                                    println!("data::  {}", data);

                                    let flname = data.split("-").nth(6).unwrap();
                                    // let data_link = data.split(";").nth(0).unwrap();
                                    // let flname = data.split(";").nth(1).unwrap();
                                    println!("link={} flname={}", data, flname);
                                    let full_path = format!("data/{}", flname.to_owned());
                                    download_file(&data.to_string(), &full_path.to_string()).await;
                                    let logger_data = Logger {
                                        macAddress: get_MAC().to_owned(),
                                        logs: "Firmware File(s) Downloaded by the client.".to_owned(),
                                    };
                                    let msg = mqtt::Message::new(
                                        format!("{}{}", "iotm-sys/device/logs/", get_MAC()),
                                        serde_json::to_string(&logger_data).unwrap(),
                                        mqtt::QOS_1
                                    );
                                    cli.publish(msg);
                                } else if
                                    ////Device Firmware Related Topics
                                    ////Client related topics
                                    msg.topic().contains("iotm-sys/device/client/url") &&
                                    msg.topic().contains(&get_MAC())
                                {
                                    //payload url;filename
                                    println!("device firmware with MAC");
                                    let data = msg.payload_str();
                                    println!("data::  {}", data);

                                    let data_link = data;
                                    let flname = "/home/pi/RPiClient-rs/RPiClient-rs.tar";
                                    println!("link={} flname={}", data_link, flname);
                                    perform_ota(&data_link.to_string(), &flname.to_string()).await;

                                    let msg = mqtt::Message::new(
                                        format!("{}{}", "iotm-sys/device/logs/", get_MAC()),
                                        "New updates downloaded.",
                                        mqtt::QOS_1
                                    );
                                    cli.publish(msg);

                                    let mut output = Command::new("pwd")
                                        .output()
                                        .expect("command failed to execute");
                                    let op = String::from_utf8_lossy(&output.stdout);
                                    println!("{}", op.to_string());
                                    // ; sudo service RPiClient-rs restart;
                                } else if msg.topic().contains("iotm-sys/device/client/url/all") {
                                    println!("device firmware all");
                                    let data = msg.payload_str();
                                    println!("data::  {}", data);

                                    let data_link = data;
                                    let flname = "/home/pi/RPiClient-rs/RPiClient-rs.tar";
                                    println!("link={} flname={}", data_link, flname);
                                    perform_ota(&data_link.to_string(), &flname.to_string()).await;

                                    let mut output = Command::new("pwd")
                                        .output()
                                        .expect("command failed to execute");
                                    let op = String::from_utf8_lossy(&output.stdout);
                                    println!("{}", op.to_string());
                                } else if
                                    // Device Config Topics
                                    msg.topic().contains("iotm-sys/device/config/") &&
                                    msg.topic().contains(&get_MAC())
                                {
                                    let data = msg.payload_str();
                                    if data.contains("command") {
                                        let cmd = data.split(";").nth(1).unwrap();
                                        // println!("CMD {}",cmd.split(" ").nth(0).unwrap());
                                        let args = shell_words
                                            ::split(data.split(";").nth(1).unwrap())
                                            .expect("failed to parse FLAGS");
                                        // println!("{:?}",&args);
                                        let mut output = Command::new(
                                            cmd.split(" ").nth(0).unwrap()
                                        )
                                            .args(&args[1..args.len()])
                                            .output()
                                            .expect("command failed to execute");
                                        let op = String::from_utf8_lossy(&output.stdout);
                                        let logger_data = Logger {
                                            macAddress: get_MAC().to_owned(),
                                            logs: op.to_string(),
                                        };
                                        let msg = mqtt::Message::new(
                                            format!("{}{}", "iotm-sys/device/logs/", get_MAC()),
                                            serde_json::to_string(&logger_data).unwrap(),
                                            mqtt::QOS_1
                                        );
                                        cli.publish(msg);
                                    } else if data.contains("logs=stdout") {
                                        let data = fs
                                            ::read_to_string(
                                                "/home/pi/RPiClient-rs/logs/stdout.log"
                                            )
                                            .expect("Unable to read file");
                                        println!("STDOUT HERE");
                                        println!("{}", data);
                                        let logger_data = Logger {
                                            macAddress: get_MAC().to_owned(),
                                            logs: data.to_string(),
                                        };
                                        let msg = mqtt::Message::new(
                                            format!("{}{}", "iotm-sys/device/logs/", get_MAC()),
                                            serde_json::to_string(&logger_data).unwrap(),
                                            mqtt::QOS_1
                                        );
                                        cli.publish(msg);
                                    } else if data.contains("logs=stdout-user-script") {
                                        let data = fs
                                            ::read_to_string(
                                                "/home/pi/RPiClient-rs/logs/stdout-uscript.log"
                                            )
                                            .expect("Unable to read file");
                                        println!("STDOUT HERE");
                                        println!("{}", data);
                                        let logger_data = Logger {
                                            macAddress: get_MAC().to_owned(),
                                            logs: data.to_string(),
                                        };
                                        let msg = mqtt::Message::new(
                                            format!("{}{}", "iotm-sys/device/logs/", get_MAC()),
                                            serde_json::to_string(&logger_data).unwrap(),
                                            mqtt::QOS_1
                                        );
                                        cli.publish(msg);
                                    } else if data.contains("logs=stderr") {
                                        let data = fs
                                            ::read_to_string(
                                                "/home/pi/RPiClient-rs/logs/stderr.log"
                                            )
                                            .expect("Unable to read file");
                                        println!("{}", data);
                                        let logger_data = Logger {
                                            macAddress: get_MAC().to_owned(),
                                            logs: data.to_string(),
                                        };
                                        let msg = mqtt::Message::new(
                                            format!("{}{}", "iotm-sys/device/logs/", get_MAC()),
                                            serde_json::to_string(&logger_data).unwrap(),
                                            mqtt::QOS_1
                                        );
                                        cli.publish(msg);
                                    } else if data.contains("logs=stderr-user-script") {
                                        let data = fs
                                            ::read_to_string(
                                                "/home/pi/RPiClient-rs/logs/stderr-uscript.log"
                                            )
                                            .expect("Unable to read file");
                                        println!("{}", data);
                                        let logger_data = Logger {
                                            macAddress: get_MAC().to_owned(),
                                            logs: data.to_string(),
                                        };
                                        let msg = mqtt::Message::new(
                                            format!("{}{}", "iotm-sys/device/logs/", get_MAC()),
                                            serde_json::to_string(&logger_data).unwrap(),
                                            mqtt::QOS_1
                                        );
                                        cli.publish(msg);
                                    } else if data.contains("logs=update-status") {
                                        println!("UPDATE STATUS");
                                        let data = fs
                                            ::read_to_string(
                                                "/home/pi/RPiClient-rs/logs/upgradeOP.txt"
                                            )
                                            .expect("Unable to read file");
                                        println!("{}", data);
                                        let logger_data = Logger {
                                            macAddress: get_MAC().to_owned(),
                                            logs: data.to_string(),
                                        };
                                        let msg = mqtt::Message::new(
                                            format!("{}{}", "iotm-sys/device/logs/", get_MAC()),
                                            serde_json::to_string(&logger_data).unwrap(),
                                            mqtt::QOS_1
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
                })
            ];

            futures::future::join_all(tasks).await;

            // Explicit return type for the async block
            Ok::<(), mqtt::Error>(())
        })
    {
        eprintln!("{}", err);
    }
}