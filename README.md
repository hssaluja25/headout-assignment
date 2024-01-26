# Headout Assignment

Submission for the headout assignment: Optimize HTTP Server.

## Prerequisites

- Docker

## Features

- Respond to GET requests at /data with file content based on query parameters.
- Accepts two query parameters: n (file name) and m (optional line number).
- Returns either the entire content of a file or a specific line.

## Installation

### Clone the Repository

```bash
git clone https://github.com/hssaluja25/headout-assignment.git
cd headout-assignment
```

### Build the Docker Image

```bash
docker build -t headout-assignment .
```

### Running the Docker container

```bash
docker run -p 8080:8080 --memory="1500m" --cpus="2.0" --name my-server headout-assignment
```

This command will start the application and make it accessible at http://localhost:8080.

## Usage

To use the application, make a GET request to http://localhost:8080/data with the required query parameters. For example:

- http://localhost:8080/data?n=1 Returns the entire content of 1.txt.
- http://localhost:8080/data?n=1&m=8 Returns the content at line 8 of 1.txt.
