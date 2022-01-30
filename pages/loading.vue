<template>
    <div>
        <v-row justify="center">
            <v-col>
                <v-progress-circular
                    class="d-block mx-auto my-5"
                    :size="200"
                    :width="14"
                    color="white"
                    indeterminate
                ></v-progress-circular>
            </v-col>
        </v-row>
    </div>
</template>

<script>
export default {
  name: 'loading',
}
</script>

<style>

</style>