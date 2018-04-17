#!/bin/bash
sudo docker-compose up -d && \
    concurrently "(cd server && nodemon npm start)" "(cd client && npm start)"
