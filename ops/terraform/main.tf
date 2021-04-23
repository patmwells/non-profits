terraform {

  backend "local" {}

  required_providers {
    heroku = {
      source  = "heroku/heroku"
      version = "~> 4.0"
    }
  }
}

variable "heroku_api_key" {
  type = string
  description = "The api key for the heroku account"
  sensitive = true
}

variable "heroku_email" {
  type = string
  description = "The email for the heroku account"
  sensitive = true
}

provider "heroku" {
  email   = var.heroku_email
  api_key = var.heroku_api_key
}

variable "node_env" {
  description = "The NODE_ENV for the application"
}

resource "heroku_config" "common" {
  vars = {
    NODE_ENV = var.node_env
  }
}

variable "app_name" {
  description = "Name of the provisioned Heroku app"
  default = "non-profits"
}

resource "heroku_app" "non-profits" {
  name   = var.app_name
  region = "us"
  stack = "container"
}

resource "heroku_app_config_association" "non-profits" {
  app_id = heroku_app.non-profits.id

  vars = heroku_config.common.vars
}
