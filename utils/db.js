import fs from "node:fs";
import path from "node:path";
import users from "../data/users.json" with { type: "json" };

const WATCHLISTS_PATH = path.join(import.meta.dirname, "../data/watchlists.json");

export function readWatchlists() {
  return JSON.parse(fs.readFileSync(WATCHLISTS_PATH, "utf-8"));
}

export function writeWatchlists(watchlists) {
  fs.writeFileSync(WATCHLISTS_PATH, JSON.stringify(watchlists, null, 2));
}

export function findByUsername(username) {
  return users.find((user) => user.username === username) || null;
}

export function findById(id) {
  return users.find((user) => String(user.id) === String(id)) || null;
}

export function getWatchlist(userId) {
  if (!findById(userId)) return null;

  const watchlists = readWatchlists();
  return watchlists[userId] || [];
}

export function addMovie(userId, movieData) {
  if (!findById(userId)) return null;

  const watchlists = readWatchlists();
  const list = watchlists[userId] || [];
  const newId = list.length ? Math.max(...list.map((movie) => movie.id)) + 1 : 1;

  const movie = {
    id: newId,
    title: movieData.title,
    genre: movieData.genre,
    watched: false
  };

  list.push(movie);
  watchlists[userId] = list;
  writeWatchlists(watchlists);

  return movie;
}

export function updateMovie(userId, movieId, updates) {
  if (!findById(userId)) return null;

  const watchlists = readWatchlists();
  const list = watchlists[userId] || [];
  const index = list.findIndex((movie) => movie.id === Number(movieId));

  if (index === -1) return null;

  list[index] = { ...list[index], ...updates, id: Number(movieId) };
  watchlists[userId] = list;
  writeWatchlists(watchlists);

  return list[index];
}

export function deleteMovie(userId, movieId) {
  if (!findById(userId)) return null;

  const watchlists = readWatchlists();
  const list = watchlists[userId] || [];
  const index = list.findIndex((movie) => movie.id === Number(movieId));

  if (index === -1) return null;

  list.splice(index, 1);
  watchlists[userId] = list;
  writeWatchlists(watchlists);

  return true;
}
