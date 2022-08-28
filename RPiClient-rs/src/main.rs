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

use futures::{executor::block_on, stream::StreamExt, channel::mpsc::Receiver};
use mqtt::{Message, AsyncClient};
use paho_mqtt as mqtt;
use std::{env, process, time::Duration};
// use std::time::Duration;
use tokio::{task, time}; // 1.3.0
                         // use tokio::prelude::*;

// The topics to which we subscribe.
const TOPICS: &[&str] = &["iotm/test", "iotm/hello"];
const QOS: &[i32] = &[1, 1];
async fn work1(cli:AsyncClient) {
    
    loop {
        

    std::thread::sleep(Duration::from_secs(5));
    println!("HI1");
    println!("Publishing a message on the topic 'test'");
        let msg = mqtt::Message::new("iotm/data", "Hello Rust MQTT world!", mqtt::QOS_1);
        cli.publish(msg);
    }
}
async fn work2() {
    loop{
    std::thread::sleep(Duration::from_secs(5));
    println!("HI2");
    }
}


/////////////////////////////////////////////////////////////////////////////
#[tokio::main]
async fn main() {
    // Initialize the logger from the environment
    env_logger::init();

    let host = env::args()
        .nth(1)
        .unwrap_or_else(|| "tcp://broker.hivemq.com:1883".to_string());

    // Create the client. Use an ID for a persistent session.
    // A real system should try harder to use a unique ID.
    let create_opts = mqtt::CreateOptionsBuilder::new()
        .server_uri(host)
        .client_id("rust_async_subscribe")
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

        println!("Subscribing to topics: {:?}", TOPICS);
        cli.subscribe_many(TOPICS, QOS).await?;

        // Just loop on incoming messages.
        println!("Waiting for messages...");

        // Note that we're not providing a way to cleanly shut down and
        // disconnect. Therefore, when you kill this app (with a ^C or
        // whatever) the server will get an unexpected drop and then
        // should emit the LWT message.
        let cli_pub = cli.clone();
        let tasks = vec![
            tokio::spawn(async move { work1(cli_pub).await }),
            tokio::spawn(async move { work2().await }),
            tokio::spawn(async move { 

                loop {
            

                    if let Some(msg_opt) = strm.next().await {
                        if let Some(msg) = msg_opt {
                            println!("MSG={}", msg.to_string());
                            if msg.to_string().contains("iotm/test") {
                                println!("topic1");
                            } else if msg.to_string().contains("iotm/hello") {
                                println!("topic2");
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
