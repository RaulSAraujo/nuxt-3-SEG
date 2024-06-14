<template>
  <!-- <v-menu
    v-if="notifications.length > 0"
    offset-y
    rounded="xl"
    max-height="80vh"
    nudge-bottom="15px"
    :close-on-content-click="false"
    @input="readNotifier"
  >
    <template #activator="{ on, attrs }">
      <v-badge
        dot
        color="blue"
        offset-y="18"
        offset-x="18"
        :content="notifications.length"
      >
        <v-btn v-bind="attrs" class="ml-2" icon plain v-on="on">
          <v-icon color="grey">mdi-bell</v-icon>
        </v-btn>
      </v-badge>
    </template>

    <v-card width="350px" rounded="lg">
      <v-toolbar color="transparent" elevation="0">
        <v-toolbar-title class="text-title">NOTIFICAÇÕES</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn class="mr-1" icon small @click="readAll()">
          <v-icon> mdi-notification-clear-all </v-icon>
        </v-btn>
      </v-toolbar>

      <v-divider></v-divider>

      <v-list two-line color="transparent">
        <v-list-item-group
          v-model="selected"
          multiple
          value="message"
          color="transparent"
          active-class="text--disabled opacityText"
        >
          <v-virtual-scroll
            :items="notifications"
            height="250px"
            item-height="64px"
            style="--width-scrollbar: 12px"
          >
            <template v-slot:default="{ item }">
              <v-list-item>
                <template #default="{ active }">
                  <v-list-item-content>
                    <v-list-item-title class="text-overline">
                      {{ item.author }}
                    </v-list-item-title>

                    <v-list-item-subtitle class="text-caption">
                      {{ item.message }}
                    </v-list-item-subtitle>
                  </v-list-item-content>

                  <v-list-item-action>
                    <v-list-item-action-text>
                      {{ formatDiffMin(item.date) }} Min
                    </v-list-item-action-text>

                    <v-badge v-if="!active" dot color="blue" />
                    <div v-else></div>
                  </v-list-item-action>
                </template>
              </v-list-item>

              <v-divider></v-divider>
            </template>
          </v-virtual-scroll>
        </v-list-item-group>
      </v-list>
    </v-card>
  </v-menu>-->

  <v-btn class="ml-2" icon>
    <v-icon color="grey">mdi-bell</v-icon>
  </v-btn>
</template>
