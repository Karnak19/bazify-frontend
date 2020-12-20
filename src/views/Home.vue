<template>
  <div class="p-grid p-flex-column p-jc-between">
    <form class="p-col-12 p-offset-0 p-md-6 p-md-offset-3">
      <!-- <input type="file" v-model="song" /> -->
      <FileUpload
        name="file"
        url="https://api-bazify.basile.vernouillet.dev/songs"
        @upload="onUpload"
      >
        <template #empty>
          <p>Drag and drop files to here to upload.</p>
        </template>
      </FileUpload>
    </form>
  </div>
</template>

<script>
import { ref } from "vue";
// @ is an alias to /src
import FileUpload from "primevue/fileupload";
export default {
  name: "Home",
  components: {
    FileUpload
  },
  setup: () => {
    const song = ref();
    const form = new FormData();
    form.append("file", song);

    const onUpload = () => {
      console.log("uploaded !");
    };

    return {
      song,
      onUpload
    };
  }
};
</script>
