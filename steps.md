## gateway
curl -Ls get.konghq.com/quickstart | bash -s -- -e KONG_LICENSE_DATA -a portal-migration

echo "KONG_PORTAL_GUI_HOST=localhost:8003 KONG_PORTAL=on kong reload exit" docker exec -i portal-migration-gateway /bin/sh

curl -i -X PATCH http://localhost:8001/workspaces/default --data "config.portal=true"

open http://localhost:8003/default


## local

npm init -y
npm install express body-parser
npm install typescript @types/node @types/express --save-dev
tsc --init

## docker

docker build -t task-manager .

docker network create portal-migration-net 2> /dev/null

docker run -d --name task-manager --network portal-migration-net task-manager


## apply gw config

deck file openapi2kong -s tasks-oas.yaml | deck sync -s -

## sample client commands

curl -X GET http://localhost:8000/tasks

curl -X GET "http://localhost:8000/tasks?status=pending"

curl -X POST -H "Content-Type: application/json" -d '{
  "id": 1,
  "title": "Buy groceries",
  "description": "Buy milk, bread, and eggs",
  "status": "pending"
}' http://localhost:8000/tasks

curl -X GET http://localhost:8000/tasks/1

curl -X PUT -H "Content-Type: application/json" -d '{
  "title": "Buy vegetables",
  "description": "Buy tomatoes, spinach, and carrots",
  "status": "completed"
}' http://localhost:8000/tasks/1

curl -X DELETE http://localhost:8000/tasks/1

