import * as api from './api.js';

let endpoints = {
    'ideas': '/data/ideas?select=_id%2Ctitle%2Cimg&sortBy=_createdOn%20desc',
    'create': '/data/ideas'
}

export async function getAllIdeas() {
    return api.get(endpoints.ideas);
}

export async function createIdea(ideaData) {
    return api.post(endpoints.create, ideaData);
}

export async function getIdeaDetails(id) {
    let currentPath = endpoints.create + `/${id}`;
    return api.get(currentPath);
}

export async function deleteIdea(id) {
    let currentPath = endpoints.create + `/${id}`;
    return api.delete(currentPath);
}