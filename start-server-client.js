#!/bin/bash
concurrently "(cd server && nodemon npm start)" "(cd client && npm start)"
