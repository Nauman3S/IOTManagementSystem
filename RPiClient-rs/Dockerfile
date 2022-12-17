# Use the container that comes with `cross` as a base. It's already got
# a cross-compile toolchain installed, so that's less work for us.
FROM rustembedded/cross:armv7-unknown-linux-gnueabihf-0.2.1

RUN apt-get update
RUN dpkg --add-architecture armhf && \
    apt-get update && \
    apt-get install --assume-yes libssl-dev:armhf libasound2-dev:armhf
RUN apt-get update && apt-get install --assume-yes \
    libssl-dev libglib2.0-dev libcairo2-dev libpango1.0-dev \
    libatk1.0-dev libgdk-pixbuf2.0-dev libsoup2.4-dev \
    libgtk-3-dev libwebkit2gtk-4.0-dev