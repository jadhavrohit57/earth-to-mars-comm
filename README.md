# earth-to-mars-comm

# Steps to start the service

 * total services = 4
    
    - planet-earth : nestJS (directory- "planer-earth" )
    - planet-mars : nestJS (directory- "planer-mars" )
    - translator : Typescript (directory- "translator" )
    - Redis : docker


* USING DOCKER COMPOSE
        - RUN COMMAND "docker compose up"
        - this will build and run all required 4 services


* OR - manually
        1. install and start the redis server on local machine
        2. start individual services
            - go inside "planet-earth" directory - "npm install" - then "npm run start:dev" (running on port 3000) - swagger url "localhost:3000/api"
            - go inside "planet-mars" directory - "npm install" - then "npm run start:dev" (running on port 3001) - swagger url "localhost:3001/api"
            - go inside "translator" directory - "npm install" - then "npm run start:dev"

# For Testing

    * USE SWAGGER 
        -   Planet earth service - "localhost:3000/api"
        -   Planet mars service - "localhost:3001/api"

    *   Send message from "Earth to Mars" call API

        POST localhost:3000/api/earth-mars-comm/message
        request body = {
                            "message": "this message is from earth"
                        }

        - CURL
            curl --location --request POST 'localhost:3000/api/earth-mars-comm/message' \
                    --header 'Content-Type: application/json' \
                    --data-raw '{
                        "message": "this message is from earth"
                    }'



    *   Send message from "Mars to Earth" call API
        POST localhost:3001/api/earth-mars-comm/message
        request body ={
                            "message": "this message is from earth"
                        }
        -   CURL
                curl --location --request POST 'localhost:3001/api/earth-mars-comm/message' \
                    --header 'Content-Type: application/json' \
                    --data-raw '{
                        "message": "8444$447777 6337777$77772433 4447777 333777666$6 62777$7777"
                    }'


* After calling those apis you can see the logs on shell 

# THINGS TO CONSIDER FOR MESSAGE

    * "$" symbol is used as delimter

        For example, 2$22 is ab because there is a $ (splitter) in between.
        Without this, 222 will become ambiguous. It can be a combination of a, ab, ba, c etc.
