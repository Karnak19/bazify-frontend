<template>
  <div class="p-grid p-jc-between">
    <form class="p-col-12 p-offset-0 p-md-6 p-md-offset-3">
      <FileUpload
        name="files"
        :url="`${API_URL}/songs`"
        :multiple="true"
        @upload="onUpload"
      >
        <template #empty>
          <p>Drag and drop files to here to upload.</p>
        </template>
      </FileUpload>
    </form>
    <figure v-for="song in songs" :key="song.id">
      <figcaption>
        {{ song.title }}
      </figcaption>
      <audio controls preload="none">
        <source :src="song.url" type="audio/mpeg" />
      </audio>
    </figure>
  </div>
</template>

<script>
import { onMounted, ref } from "vue";
import FileUpload from "primevue/fileupload";

import { API_URL } from "../api";

export default {
  name: "Home",
  components: {
    FileUpload
  },
  setup: () => {
    const songs = ref([]);

    const fetchSongs = async () => {
      const res = await fetch(API_URL + "/songs");
      const json = await res.json();

      songs.value = json.map(s => {
        return {
          ...s,
          url: API_URL + s.url
        };
      });
    };

    const onUpload = async () => {
      await fetchSongs();
    };

    onMounted(fetchSongs);

    return {
      songs,
      onUpload,
      API_URL
    };
  }
};
</script>
