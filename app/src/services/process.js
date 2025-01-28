const express = require('express')
const axios = require('axios');
const fs = require('fs');
const router = new express.Router()

async function roadmapping(document) {

    let response = null;
    try {
        console.log("Roadmapping document: " + document._id)
        response = await axios.get('http://roadmap-service:4102/roadmap/document/' + document._id)
        console.log("Finished roadmapping document: " + document._id)
        return response
    } catch (error) {
        console.log(error);
    }
    return response
}

async function ner(document) {

    let response = null;
    try {
        console.log("NER document: " + document._id)
        response = await axios.get('http://roadmap-service:4102/ner/document/' + document._id)
        console.log("Finished NER document: " + document._id)
        return response
    } catch (error) {
        console.log(error);
    }
    return response
}

async function refineRoadmapAfterNER(document) {

    let response = null;
    try {
        console.log("Initializing refinement of roadmap of document: " + document._id)
        response = await axios.get('http://roadmap-service:4102/roadmap/refinement/document/' + document._id)
        console.log("Finished refinement of roadmap of document: " + document._id)
        return response
    } catch (error) {
        console.log(error);
    }
    return response
}

module.exports = {
    roadmapping,
    ner,
    refineRoadmapAfterNER
  };