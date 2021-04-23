variable "heroku_api_key" {
  description = "The api key for the heroku account"
  sensitive = true
}

variable "heroku_email" {
  description = "The email for the heroku account"
  sensitive = true
}

variable "heroku_app_name" {
  description = "Name of the provisioned Heroku app"
}

variable "node_env" {
  description = "The NODE_ENV for the application"
}

variable "log_solution" {
  description = "The logging solution for the application"
  sensitive = true
}

terraform {
  backend "local" {}

  required_providers {
    heroku = {
      source  = "heroku/heroku"
      version = "~> 4.0"
    }
  }
}

provider "heroku" {
  email   = var.heroku_email
  api_key = var.heroku_api_key
}

resource "heroku_app" "non-profits" {
  name   = var.heroku_app_name
  region = "us"
  stack = "container"

  config_vars = {
    NODE_ENV = var.node_env
  }
}

resource "heroku_addon" "logging" {
  app = heroku_app.non-profits.name
  plan = var.log_solution
}
