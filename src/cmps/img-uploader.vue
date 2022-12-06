<template>
  <section
      class="upload-preview"
      :class="{ 'drag-zone': isDragover }"
      @drop.prevent="handleFile"
      @dragover.prevent="isDragover = true"
      @dragleave="isDragover = false"
  >
      <label v-if="!isUploading" :class="{ drag: isDragover }">
        <upload-icon :class="{ drag: isDragover }" />
          <p> Drag or click to upload</p>
          <input type="file" @change="uploadImg" hidden />
      </label>
      <img v-else src="../assets/loader.gif" alt="" />
  </section>
</template>

<script>
import { uploadService } from '../services/upload.service.js'
import uploadIcon from '../assets/svgs/upload-icon.vue'
export default {
  data() {
    return {
      imgUrl: null,
      height: 500,
      width: 500,
      isUploading: false,
      isDragover: false,
    }
  },
  methods: {
    handleFile(ev) {
            let file
            if (ev.type === 'change') file = ev.target.files[0]
            else if (ev.type === 'drop') file = ev.dataTransfer.files[0]
            this.uploadImg(file)
        },

    async uploadImg(ev) {
      this.isUploading = true
      // this.isDragover = false

      const { secure_url, height, width } = await uploadService.uploadImg(ev)
      // const a =await uploadService.uploadImg(ev)
      this.isUploading = false
      this.imgUrl = secure_url
      this.height = height
      this.width = width
      this.$emit('uploaded', this.imgUrl)
    }
  },
  computed: {
    uploadMsg() {
      if (this.imgUrl) return 'Upload Another?'
      return this.isUploading ? 'Uploading....' : 'Upload Image'
    }
  },
  components:{
    uploadIcon
  },
}
</script>
