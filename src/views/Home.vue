<template>
  <div class="p-grid nested-grid">
    <form class="p-col-10 p-offset-1 p-md-8 p-md-offset-2">
      <FileUpload
        name="songs"
        :url="`${API_URL}/api/v1/songs`"
        :multiple="true"
        @upload="onUpload"
      >
        <template #empty>
          <p>Drag and drop files to here to upload.</p>
        </template>
      </FileUpload>
    </form>

    <section class="p-col-6 p-offset-3">
      <h2>
        {{ currentSong.title }}
      </h2>
      <div class="p-grid">
        <div class="p-col-4">
          <Button
            icon="pi pi-backward"
            class="p-button-rounded"
            @click="prev"
          />
        </div>
        <div v-if="!isPlaying" class="p-col-4 text-center">
          <Button
            icon="pi pi-play"
            class="p-button-rounded"
            @click="play(null, currentSong)"
          />
        </div>
        <div v-else class="p-col-4 text-center">
          <Button icon="pi pi-pause" class="p-button-rounded" @click="pause" />
        </div>
        <div class="p-col-4 text-center">
          <Button icon="pi pi-forward" class="p-button-rounded" @click="next" />
        </div>
      </div>
    </section>
    <section class="p-col-6 p-offset-3">
      <div class="p-grid">
        <h3 class="p-col-12">The Playlist</h3>
        <Button
          v-for="song in songs"
          :key="song.src"
          @click="play(null, song)"
          class="p-col-12"
          :class="song.id === currentSong.id ? 'song p-button-danger' : 'song'"
          :label="song.title"
        />
      </div>
    </section>
  </div>
</template>

<script>
import { onMounted, ref } from "vue";
import FileUpload from "primevue/fileupload";
import Button from "primevue/button";

import { API_URL } from "../api";

export default {
  name: "Home",
  components: {
    FileUpload,
    Button
  },
  setup: () => {
    const currentSong = ref({});
    const index = ref(0);
    const isPlaying = ref(false);
    const songs = ref([]);
    const player = ref(new Audio());

    const play = (_, song) => {
      if (typeof song.src != undefined) {
        currentSong.value = song;

        player.value.src = currentSong.value.path;
      }
      player.value.play();
      player.value.addEventListener("ended", () => {
        console.log("ended");
        index.value++;
        if (index.value > songs.value.length - 1) {
          index.value = 0;
        }
      });
      isPlaying.value = true;
    };

    const pause = () => {
      player.value.pause();
      isPlaying.value = false;
    };

    const next = () => {
      index.value++;
      if (index.value > songs.value.length - 1) {
        index.value = 0;
      }
      currentSong.value = songs.value[index.value];
      play(null, currentSong.value);
    };

    const prev = () => {
      index.value--;
      if (index.value < 0) {
        index.value = songs.value.length - 1;
      }
      currentSong.value = songs.value[index.value];
      play(null, currentSong.value);
    };

    const fetchSongs = async () => {
      const res = await fetch(API_URL + "/api/v1/songs");
      const json = await res.json();

      songs.value = json.map(s => {
        return {
          ...s,
          path: API_URL + s.path
        };
      });
    };

    const onUpload = async () => {
      await fetchSongs();
    };

    onMounted(async () => {
      await fetchSongs();
      currentSong.value = songs.value[index.value];
      player.value.src = currentSong.value.path;
    });

    return {
      songs,
      currentSong,
      onUpload,
      API_URL,
      player,
      isPlaying,
      play,
      pause,
      prev,
      next
    };
  }
};
</script>

<style>
text-center {
  text-align: center;
}
</style>
