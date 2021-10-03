FROM node:slim@sha256:74a925c7c69748f3d93ba11d117d9ba0534369afd2187c6471238dce71320be3

WORKDIR /home/geekEditor

RUN apt update && apt install sudo -y && echo "node ALL=(ALL) NOPASSWD:ALL" >> /etc/sudoers

USER node

ENTRYPOINT tail -f /dev/null
