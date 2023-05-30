<template>
  <accordian-panel :title="`Block Characters`" :defaultCollapsed="true">
    <template #headerIcon>
      <!-- -->
      <svg
        class="w-4 h-4 mr-2 mt-1"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        version="1.1"
        viewBox="-10 0 1248 2048"
      >
        <path
          fill="currentColor"
          d="M819 819v-307q0 -42 -30 -72t-73 -30h-204q-43 0 -73 30t-30 72v307h410zM204 1638q-84 0 -145 -59q-59 -61 -59 -145v-1024q0 -170 120 -290t289 -120h410q170 0 289 120q120 120 120 290v1024q0 84 -60 145q-60 59 -144 59q-85 0 -145 -59q-60 -61 -60 -145v-205h-410
v205q0 84 -60 145q-60 59 -145 59v0z"
        />
      </svg>
    </template>
    <div class="flex flex-row flex-wrap overflow-auto p-1 max-h-96">
      <div @dragstart="dragStart" draggable="true" class="mr-1">
        <!--A -->
        <svg
          @drag="dragStart"
          class="h-16 cursor-move"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          version="1.1"
          viewBox="-10 0 1248 2048"
        >
          <path
            fill="currentColor"
            d="M819 819v-307q0 -42 -30 -72t-73 -30h-204q-43 0 -73 30t-30 72v307h410zM204 1638q-84 0 -145 -59q-59 -61 -59 -145v-1024q0 -170 120 -290t289 -120h410q170 0 289 120q120 120 120 290v1024q0 84 -60 145q-60 59 -144 59q-85 0 -145 -59q-60 -61 -60 -145v-205h-410
v205q0 84 -60 145q-60 59 -145 59v0z"
          />
        </svg>
      </div>

      <div @dragstart="dragStart" draggable="true" class="mr-1">
        <!--B -->
        <svg
          class="h-16 cursor-move"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          version="1.1"
          viewBox="-10 0 1248 2048"
        >
          <path
            fill="currentColor"
            d="M819 1229v-307h-410v307h410zM819 717v-307h-410v307h410zM0 1638v-1638h819q170 0 289 120q120 120 120 290v204q0 85 -60 145t-144 60q84 0 144 60t60 145v205q0 170 -120 289q-120 120 -289 120h-819z"
          />
        </svg>
      </div>

      <div @dragstart="dragStart" draggable="true" class="mr-1">
        <!--C -->
        <svg
          class="h-16 cursor-move"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          version="1.1"
          viewBox="-10 0 1248 2048"
        >
          <path
            fill="currentColor"
            d="M409 1638q-170 0 -289 -120q-120 -120 -120 -289v-819q0 -170 120 -290t289 -120h410q170 0 289 120q120 120 120 290v102h-409q0 -42 -30 -72t-73 -30h-204q-43 0 -73 30t-30 72v614q0 43 30 73t73 30h204q43 0 73 -30t30 -73h409v103q0 170 -120 289q-120 120 -289 120
h-410z"
          />
        </svg>
      </div>

      <div @dragstart="dragStart" draggable="true" class="mr-1">
        <!--D -->
        <svg
          class="h-16 cursor-move"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          version="1.1"
          viewBox="-10 0 1248 2048"
        >
          <path
            fill="currentColor"
            d="M716 1229q43 0 73 -30t30 -73v-614q0 -42 -30 -72t-73 -30h-307v819h307zM204 1638q-84 0 -145 -59q-59 -61 -59 -145v-1229q0 -84 59 -145q61 -60 145 -60h615q170 0 289 120q120 120 120 290v819q0 170 -120 289q-120 120 -289 120h-615z"
          />
        </svg>
      </div>

      <div @dragstart="dragStart" draggable="true" class="mr-1">
        <!--E -->
        <svg
          class="h-16 cursor-move"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          version="1.1"
          viewBox="-10 0 1248 2048"
        >
          <path
            fill="currentColor"
            d="M409 1638q-170 0 -289 -120q-120 -120 -120 -289v-819q0 -170 120 -290t289 -120h615q84 0 144 60t60 145t-60 145t-144 60h-547q-28 0 -48 12t-20 29t20 29t48 12h342q56 0 96 24t40 58v163q0 34 -40 58t-96 24h-307q-43 0 -73 30t-30 73v204q0 43 30 73t73 30h512
q84 0 144 60t60 145q0 84 -60 145q-60 59 -144 59h-615z"
          />
        </svg>
      </div>

      <div @dragstart="dragStart" draggable="true" class="mr-1">
        <!--F -->
        <svg
          class="h-16 cursor-move"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          version="1.1"
          viewBox="-10 0 1248 2048"
        >
          <path
            fill="currentColor"
            d="M204 1638q-84 0 -145 -59q-59 -61 -59 -145v-1024q0 -170 120 -290t289 -120h615q84 0 144 60t60 145t-60 145t-144 60h-547q-28 0 -48 12t-20 29t20 29t48 12h342q56 0 96 24t40 58v163q0 34 -40 58t-96 24h-307q-43 0 -73 30t-30 73v512q0 84 -60 145q-60 59 -145 59v0
z"
          />
        </svg>
      </div>

      <div @dragstart="dragStart" draggable="true" class="mr-1">
        <!--G -->
        <svg
          class="h-16 cursor-move"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          version="1.1"
          viewBox="-10 0 1248 2048"
        >
          <path
            fill="currentColor"
            d="M409 1638q-170 0 -289 -120q-120 -120 -120 -289v-819q0 -170 120 -290t289 -120h615q84 0 144 60t60 145t-60 145t-144 60h-512q-43 0 -73 30t-30 72v717h410v-82q-57 0 -97 -24t-40 -58v-164q0 -34 40 -58t97 -24h205q84 0 144 60t60 145v410q0 84 -60 145
q-60 59 -144 59h-615z"
          />
        </svg>
      </div>

      <div @dragstart="dragStart" draggable="true" class="mr-1">
        <!--H -->
        <svg
          class="h-16 cursor-move"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          version="1.1"
          viewBox="-10 0 1248 2048"
        >
          <path
            fill="currentColor"
            d="M204 1638q-84 0 -145 -59q-59 -61 -59 -145v-1229q0 -85 59 -145q61 -60 145 -60q85 0 145 60t60 145v102q0 43 30 73t73 30h204q43 0 73 -30t30 -73v-102q0 -85 60 -145t145 -60q84 0 144 60t60 145v1229q0 84 -60 145q-60 59 -144 59q-85 0 -145 -59q-60 -61 -60 -145
v-512q0 -43 -30 -73t-73 -30h-204q-43 0 -73 30t-30 73v512q0 84 -60 145q-60 59 -145 59v0z"
          />
        </svg>
      </div>

      <div @dragstart="dragStart" draggable="true" class="mr-1">
        <!--I -->
        <svg
          class="h-16 cursor-move"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          version="1.1"
          viewBox="-10 0 429 2048"
        >
          <path
            fill="currentColor"
            d="M204 1638q-84 0 -145 -59q-59 -61 -59 -145v-1229q0 -85 59 -145q61 -60 145 -60q85 0 145 60t60 145v1229q0 84 -60 145q-60 59 -145 59v0z"
          />
        </svg>
      </div>

      <div @dragstart="dragStart" draggable="true" class="mr-1">
        <!--J -->
        <svg
          class="h-16 cursor-move"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          version="1.1"
          viewBox="-10 0 1248 2048"
        >
          <path
            fill="currentColor"
            d="M409 1638q-170 0 -289 -120q-120 -120 -120 -289v-205q0 -85 59 -145q61 -60 145 -60q85 0 145 60t60 145v102q0 43 30 73t73 30h204q43 0 73 -30t30 -73v-921q0 -85 60 -145t145 -60q84 0 144 60t60 145v1024q0 170 -120 289q-120 120 -289 120h-410z"
          />
        </svg>
      </div>

      <div @dragstart="dragStart" draggable="true" class="mr-1">
        <!--K -->
        <svg
          class="h-16 cursor-move"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          version="1.1"
          viewBox="-10 0 1248 2048"
        >
          <path
            fill="currentColor"
            d="M204 1638q-84 0 -145 -59q-59 -61 -59 -145v-1229q0 -85 59 -145q61 -60 145 -60q85 0 145 60t60 145v205h205l205 -205v-205h409v205l-409 409l409 410v410q0 84 -60 145q-60 59 -144 59q-85 0 -145 -59q-60 -61 -60 -145v-410l-205 -205h-205v615q0 84 -60 145
q-60 59 -145 59v0z"
          />
        </svg>
      </div>

      <div @dragstart="dragStart" draggable="true" class="mr-1">
        <!--L -->
        <svg
          class="h-16 cursor-move"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          version="1.1"
          viewBox="-10 0 1248 2048"
        >
          <path
            fill="currentColor"
            d="M204 1638q-84 0 -145 -59q-59 -61 -59 -145v-1229q0 -85 59 -145q61 -60 145 -60q85 0 145 60t60 145v921q0 43 30 73t73 30h512q84 0 144 60t60 145q0 84 -60 145q-60 59 -144 59h-820z"
          />
        </svg>
      </div>

      <div @dragstart="dragStart" draggable="true" class="mr-1">
        <!--M -->
        <svg
          class="h-16 cursor-move"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          version="1.1"
          viewBox="-10 0 1248 2048"
        >
          <path
            fill="currentColor"
            d="M204 1638q-84 0 -145 -59q-59 -61 -59 -145v-1229q0 -84 59 -145q61 -60 145 -60h205q85 0 145 60t60 145q0 -85 60 -145t145 -60h205q84 0 144 60t60 145v1229q0 84 -60 145q-60 59 -144 59q-85 0 -145 -59q-60 -61 -60 -145v-615q0 85 -60 145t-145 60t-145 -60
t-60 -145v615q0 84 -60 145q-60 59 -145 59v0z"
          />
        </svg>
      </div>

      <div @dragstart="dragStart" draggable="true" class="mr-1">
        <!--N -->
        <svg
          class="h-16 cursor-move"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          version="1.1"
          viewBox="-10 0 1248 2048"
        >
          <path
            fill="currentColor"
            d="M204 1638q-84 0 -145 -59q-59 -61 -59 -145v-1229q0 -85 59 -145q61 -60 145 -60q85 0 145 60t60 145l410 409v-409q0 -85 60 -145t145 -60q84 0 144 60t60 145v1229q0 84 -60 145q-60 59 -144 59q-85 0 -145 -59q-60 -61 -60 -145l-410 -410v410q0 84 -60 145
q-60 59 -145 59v0z"
          />
        </svg>
      </div>

      <div @dragstart="dragStart" draggable="true" class="mr-1">
        <!--O -->
        <svg
          class="h-16 cursor-move"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          version="1.1"
          viewBox="-10 0 1248 2048"
        >
          <path
            fill="currentColor"
            d="M716 1229q43 0 73 -30t30 -73v-614q0 -42 -30 -72t-73 -30h-204q-43 0 -73 30t-30 72v614q0 43 30 73t73 30h204zM409 1638q-170 0 -289 -120q-120 -120 -120 -289v-819q0 -170 120 -290t289 -120h410q170 0 289 120q120 120 120 290v819q0 170 -120 289
q-120 120 -289 120h-410z"
          />
        </svg>
      </div>

      <div @dragstart="dragStart" draggable="true" class="mr-1">
        <!--P -->
        <svg
          class="h-16 cursor-move"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          version="1.1"
          viewBox="-10 0 1248 2048"
        >
          <path
            fill="currentColor"
            d="M716 819q43 0 73 -30t30 -72v-205q0 -42 -30 -72t-73 -30h-204q-43 0 -73 30t-30 72v205q0 42 30 72t73 30h204zM204 1638q-84 0 -145 -59q-59 -61 -59 -145v-1024q0 -170 120 -290t289 -120h410q170 0 289 120q120 120 120 290v409q0 170 -120 290t-289 120h-410v205
q0 84 -60 145q-60 59 -145 59v0z"
          />
        </svg>
      </div>

      <div @dragstart="dragStart" draggable="true" class="mr-1">
        <!--Q -->
        <svg
          class="h-16 cursor-move"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          version="1.1"
          viewBox="-10 0 1248 2048"
        >
          <path
            fill="currentColor"
            d="M716 1229q43 0 73 -30t30 -73v-614q0 -42 -30 -72t-73 -30h-204q-43 0 -73 30t-30 72v614q0 43 30 73t73 30h204zM409 1638q-170 0 -289 -120q-120 -120 -120 -289v-819q0 -170 120 -290t289 -120h410q170 0 289 120q120 120 120 290v614q0 85 -60 145t-144 60
q80 0 144 70q60 66 60 135q0 84 -60 145q-60 59 -144 59q-85 0 -145 -59q-60 -61 -60 -145q0 84 -60 145q-60 59 -145 59h-205z"
          />
        </svg>
      </div>

      <div @dragstart="dragStart" draggable="true" class="mr-1">
        <!--R -->
        <svg
          class="h-16 cursor-move"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          version="1.1"
          viewBox="-10 0 1248 2048"
        >
          <path
            fill="currentColor"
            d="M716 819q43 0 73 -30t30 -72v-205q0 -42 -30 -72t-73 -30h-307v409h307zM204 1638q-84 0 -145 -59q-59 -61 -59 -145v-1229q0 -84 59 -145q61 -60 145 -60h615q170 0 289 120q120 120 120 290v204q0 85 -60 145t-144 60q84 0 144 60t60 145v410q0 84 -60 145
q-60 59 -144 59q-85 0 -145 -59q-60 -61 -60 -145v-103q0 -42 -30 -72t-73 -30h-307v205q0 84 -60 145q-60 59 -145 59v0z"
          />
        </svg>
      </div>

      <div @dragstart="dragStart" draggable="true" class="mr-1">
        <!--S -->
        <svg
          class="h-16 cursor-move"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          version="1.1"
          viewBox="-10 0 1248 2048"
        >
          <path
            fill="currentColor"
            d="M204 1638q-84 0 -145 -59q-59 -61 -59 -145q0 -85 59 -145q61 -60 145 -60h512q43 0 73 -30t30 -73v-204q0 -43 -30 -73t-73 -30h-307q-170 0 -289 -120q-120 -120 -120 -289q0 -170 120 -290t289 -120h615q84 0 144 60t60 145t-60 145t-144 60h-205q170 0 289 120
q120 120 120 289v410q0 170 -120 289q-120 120 -289 120h-615z"
          />
        </svg>
      </div>

      <div @dragstart="dragStart" draggable="true" class="mr-1">
        <!--T -->
        <svg
          class="h-16 cursor-move"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          version="1.1"
          viewBox="-10 0 1248 2048"
        >
          <path
            fill="currentColor"
            d="M614 1638q-85 0 -145 -59q-60 -61 -60 -145v-1024h-205q-84 0 -145 -60q-59 -60 -59 -145t59 -145q61 -60 145 -60h820q84 0 144 60t60 145t-60 145t-144 60h-205v1024q0 84 -60 145q-60 59 -145 59v0z"
          />
        </svg>
      </div>

      <div @dragstart="dragStart" draggable="true" class="mr-1">
        <!--U -->
        <svg
          class="h-16 cursor-move"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          version="1.1"
          viewBox="-10 0 1248 2048"
        >
          <path
            fill="currentColor"
            d="M409 1638q-170 0 -289 -120q-120 -120 -120 -289v-1024q0 -85 59 -145q61 -60 145 -60q85 0 145 60t60 145v921q0 43 30 73t73 30h204q43 0 73 -30t30 -73v-921q0 -85 60 -145t145 -60q84 0 144 60t60 145v1024q0 170 -120 289q-120 120 -289 120h-410z"
          />
        </svg>
      </div>

      <div @dragstart="dragStart" draggable="true" class="mr-1">
        <!--V -->
        <svg
          class="h-16 cursor-move"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          version="1.1"
          viewBox="-10 0 1248 2048"
        >
          <path
            fill="currentColor"
            d="M614 1638l-614 -614v-819q0 -85 59 -145q61 -60 145 -60q85 0 145 60t60 145v819l205 205l205 -205v-819q0 -85 60 -145t145 -60q84 0 144 60t60 145v819l-614 614v0z"
          />
        </svg>
      </div>

      <div @dragstart="dragStart" draggable="true" class="mr-1">
        <!--W -->
        <svg
          class="h-16 cursor-move"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          version="1.1"
          viewBox="-10 0 1248 2048"
        >
          <path
            fill="currentColor"
            d="M409 1638v0v0v0zM409 1638v0v0q-170 0 -289 -120q-120 -120 -120 -289v-1024q0 -85 59 -145q61 -60 145 -60q85 0 145 60t60 145v614q0 -84 60 -145q60 -60 145 -60t145 60q60 61 60 145v-614q0 -85 60 -145t145 -60q84 0 144 60t60 145v1024q0 170 -120 289
q-120 120 -289 120q-85 0 -146 -59q-60 -61 -60 -145q0 84 -59 145q-60 59 -145 59v0z"
          />
        </svg>
      </div>

      <div @dragstart="dragStart" draggable="true" class="mr-1">
        <!--X -->
        <svg
          class="h-16 cursor-move"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          version="1.1"
          viewBox="-10 0 1248 2048"
        >
          <path
            fill="currentColor"
            d="M204 1638q-84 0 -145 -59q-59 -61 -59 -145v-615l409 -102v-205l-409 -102v-205q0 -85 59 -145q61 -60 145 -60q85 0 145 60t60 145v102l205 103l205 -103v-102q0 -85 60 -145t145 -60q84 0 144 60t60 145v205l-409 102v205l409 102v615q0 84 -60 145q-60 59 -144 59
q-85 0 -145 -59q-60 -61 -60 -145v-512l-205 -103l-205 103v512q0 84 -60 145q-60 59 -145 59v0z"
          />
        </svg>
      </div>

      <div @dragstart="dragStart" draggable="true" class="mr-1">
        <!--Y -->
        <svg
          class="h-16 cursor-move"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          version="1.1"
          viewBox="-10 0 1248 2048"
        >
          <path
            fill="currentColor"
            d="M614 1638q-85 0 -145 -59q-60 -61 -60 -145v-615h-205q-84 0 -145 -60q-59 -60 -59 -145v-409q0 -85 59 -145q61 -60 145 -60q85 0 145 60t60 145v205h410v-205q0 -85 60 -145t145 -60q84 0 144 60t60 145v409q0 85 -60 145t-144 60h-205v615q0 84 -60 145
q-60 59 -145 59v0z"
          />
        </svg>
      </div>

      <div @dragstart="dragStart" draggable="true" class="mr-1">
        <!--Z -->
        <svg
          class="h-16 cursor-move"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          version="1.1"
          viewBox="-10 0 1248 2048"
        >
          <path
            fill="currentColor"
            d="M0 1638v-614l614 -614h-410q-84 0 -145 -60q-59 -60 -59 -145t59 -145q61 -60 145 -60h1024v614l-614 615h410q84 0 144 60t60 145q0 84 -60 145q-60 59 -144 59h-1024z"
          />
        </svg>
      </div>

      <div @dragstart="dragStart" draggable="true" class="mr-1">
        <!--a -->
        <svg
          class="h-16 cursor-move"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          version="1.1"
          viewBox="-10 0 1248 2048"
        >
          <path
            fill="currentColor"
            d="M716 1229q43 0 73 -30t30 -73v-204q0 -43 -30 -73t-73 -30h-204q-43 0 -73 30t-30 73v204q0 43 30 73t73 30h204zM409 1638q-170 0 -289 -120q-120 -120 -120 -289v-410q0 -170 120 -289q120 -120 289 -120h205q85 0 145 60t60 144q0 -84 60 -144t145 -60q84 0 144 60
t60 144v820q0 84 -60 145q-60 59 -144 59q-85 0 -145 -59q-60 -61 -60 -145q0 84 -60 145q-60 59 -145 59h-205z"
          />
        </svg>
      </div>

      <div @dragstart="dragStart" draggable="true" class="mr-1">
        <!--b -->
        <svg
          class="h-16 cursor-move"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          version="1.1"
          viewBox="-10 0 1248 2048"
        >
          <path
            fill="currentColor"
            d="M716 1229q43 0 73 -30t30 -73v-204q0 -43 -30 -73q-27 -26 -63 -29h-224q-36 3 -63 29q-30 30 -30 73v204q0 43 30 73t73 30h204zM204 1638q-84 0 -145 -59q-59 -61 -59 -145v-1229q0 -85 59 -145q61 -60 145 -60q85 0 145 60t60 145v410q0 -85 60 -145t145 -60h205
q170 0 289 120q120 120 120 289v410q0 170 -120 289q-120 120 -289 120h-205q-85 0 -145 -59q-60 -61 -60 -145q0 84 -60 145q-60 59 -145 59v0z"
          />
        </svg>
      </div>

      <div @dragstart="dragStart" draggable="true" class="mr-1">
        <!--c -->
        <svg
          class="h-16 cursor-move"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          version="1.1"
          viewBox="-10 0 1248 2048"
        >
          <path
            fill="currentColor"
            d="M409 1638q-170 0 -289 -120q-120 -120 -120 -289v-410q0 -170 120 -289q120 -120 289 -120h410q170 0 289 120q120 120 120 289v164h-409v-61q0 -43 -30 -73t-73 -30h-204q-43 0 -73 30t-30 73v204q0 43 30 73t73 30h204q43 0 73 -30t30 -73v-61h409v164q0 170 -120 289
q-120 120 -289 120h-410z"
          />
        </svg>
      </div>

      <div @dragstart="dragStart" draggable="true" class="mr-1">
        <!--d -->
        <svg
          class="h-16 cursor-move"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          version="1.1"
          viewBox="-10 0 1248 2048"
        >
          <path
            fill="currentColor"
            d="M716 1229q43 0 73 -30t30 -73v-204q0 -43 -30 -73t-73 -30h-204q-43 0 -73 30t-30 73v204q0 43 30 73t73 30h204zM409 1638q-170 0 -289 -120q-120 -120 -120 -289v-410q0 -170 120 -289q120 -120 289 -120h205q85 0 145 60t60 144v-409q0 -85 60 -145t145 -60
q84 0 144 60t60 145v1229q0 84 -60 145q-60 59 -144 59q-85 0 -145 -59q-60 -61 -60 -145q0 84 -60 145q-60 59 -145 59h-205z"
          />
        </svg>
      </div>

      <div @dragstart="dragStart" draggable="true" class="mr-1">
        <!--e -->
        <svg
          class="h-16 cursor-move"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          version="1.1"
          viewBox="-10 0 1248 2048"
        >
          <path
            fill="currentColor"
            d="M819 888v-69h-410v69h410zM409 1638q-170 0 -289 -120q-120 -120 -120 -289v-410q0 -170 120 -289q120 -120 289 -120h410q170 0 289 120q120 120 120 289v205q0 85 -60 145t-144 60h-615v82h410q56 0 96 24t40 58v164q0 34 -40 57q-40 24 -96 24h-410z"
          />
        </svg>
      </div>

      <div @dragstart="dragStart" draggable="true" class="mr-1">
        <!-- -->
        <svg
          class="h-16 cursor-move"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          version="1.1"
          viewBox="-10 0 1248 2048"
        >
          <path
            fill="currentColor"
            d="M819 1229v-307h-410v307h410zM819 717v-307h-410v307h410zM409 1638q-170 0 -289 -120q-120 -120 -120 -289q0 -170 120 -290t289 -120q-170 0 -289 -120q-120 -120 -120 -289q0 -170 120 -290t289 -120h410q170 0 289 120q120 120 120 290t-120 289q-120 120 -289 120
q170 0 289 120q120 120 120 290t-120 289q-120 120 -289 120h-410z"
          />
        </svg>
      </div>

      <div @dragstart="dragStart" draggable="true" class="mr-1">
        <!-- -->
        <svg
          class="h-16 cursor-move"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          version="1.1"
          viewBox="-10 0 839 2048"
        >
          <path
            fill="currentColor"
            d="M204 1638q-84 0 -145 -59q-59 -61 -59 -145q0 -85 59 -145q61 -60 145 -60h410q85 0 145 60t60 145q0 84 -60 145q-60 59 -145 59h-410zM204 819q-84 0 -145 -60q-59 -60 -59 -145q0 -84 59 -144q61 -60 145 -60h410q85 0 145 60t60 144q0 85 -60 145t-145 60h-410z"
          />
        </svg>
      </div>

      <div @dragstart="dragStart" draggable="true" class="mr-1">
        <!-- -->
        <svg
          class="h-16 cursor-move"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          version="1.1"
          viewBox="-10 0 429 2048"
        >
          <path
            fill="currentColor"
            d="M136 1638q-57 0 -96 -30q-40 -30 -40 -72v-102q0 -43 40 -73t96 -30h137q56 0 96 30t40 73v102q0 43 -40 72q-40 30 -96 30h-137zM204 1229q-84 0 -145 -60q-59 -60 -59 -145v-819q0 -85 59 -145q61 -60 145 -60q85 0 145 60t60 145v819q0 85 -60 145t-145 60v0z"
          />
        </svg>
      </div>

      <div @dragstart="dragStart" draggable="true" class="mr-1">
        <!-- -->
        <svg
          class="h-16 cursor-move"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          version="1.1"
          viewBox="-10 0 839 2048"
        >
          <path
            fill="currentColor"
            d="M204 1638q-84 0 -145 -59q-59 -61 -59 -145v-1024q0 -170 120 -290t289 -120h205q85 0 145 60t60 145t-60 145t-145 60h-205v409h205q85 0 145 60t60 145t-60 145t-145 60h-205v205q0 84 -60 145q-60 59 -145 59v0z"
          />
        </svg>
      </div>

      <div @dragstart="dragStart" draggable="true" class="mr-1">
        <!-- -->
        <svg
          class="h-16 cursor-move"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          version="1.1"
          viewBox="-10 0 1248 2048"
        >
          <path
            fill="currentColor"
            d="M204 1638q-84 0 -145 -59q-59 -61 -59 -145q0 -85 59 -145q61 -60 145 -60h512q43 0 73 -30t30 -73v-204q0 -43 -30 -73t-73 -30h-512q-84 0 -145 -60q-59 -60 -59 -145v-204q0 -170 120 -290t289 -120h615q84 0 144 60t60 145t-60 145t-144 60h-205q170 0 289 120
q120 120 120 289v410q0 170 -120 289q-120 120 -289 120h-615z"
          />
        </svg>
      </div>

      <div @dragstart="dragStart" draggable="true" class="mr-1">
        <!-- -->
        <svg
          class="h-16 cursor-move"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          version="1.1"
          viewBox="-10 0 1248 2048"
        >
          <path
            fill="currentColor"
            d="M1024 1638q-85 0 -145 -59q-60 -61 -60 -145v-512q0 -43 -30 -73t-73 -30h-307q-170 0 -289 -120q-120 -120 -120 -289v-205q0 -85 59 -145q61 -60 145 -60q85 0 145 60t60 145v102q0 43 30 73t73 30h204q43 0 73 -30t30 -73v-102q0 -85 60 -145t145 -60q84 0 144 60
t60 145v1229q0 84 -60 145q-60 59 -144 59v0z"
          />
        </svg>
      </div>

      <div @dragstart="dragStart" draggable="true" class="mr-1">
        <!-- -->
        <svg
          class="h-16 cursor-move"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          version="1.1"
          viewBox="-10 0 1248 2048"
        >
          <path
            fill="currentColor"
            d="M805 1178q14 -23 14 -52v-204q0 -43 -30 -73t-73 -30h-204q-43 0 -73 30t-30 73v204q0 29 13 52h383zM409 2047q-85 0 -145 -60t-60 -145q0 -84 60 -145q60 -59 145 -59h410v-51h-410q-170 0 -289 -120q-102 -101 -118 -238h-2v-410q0 -170 120 -289q120 -120 289 -120
h410q170 0 289 120q120 120 120 289v819q0 169 -120 289t-289 120h-410z"
          />
        </svg>
      </div>

      <div @dragstart="dragStart" draggable="true" class="mr-1">
        <!-- -->
        <svg
          class="h-16 cursor-move"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          version="1.1"
          viewBox="-10 0 429 2048"
        >
          <path
            fill="currentColor"
            d="M204 410q-84 0 -145 -60q-59 -60 -59 -145v-205h204q85 0 145 60t60 145v205h-205z"
          />
        </svg>
      </div>

      <div @dragstart="dragStart" draggable="true" class="mr-1">
        <!-- -->
        <svg
          class="h-16 cursor-move"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          version="1.1"
          viewBox="-10 0 1248 2048"
        >
          <path
            fill="currentColor"
            d="M204 1638q-84 0 -145 -59q-59 -61 -59 -145v-1229q0 -85 59 -145q61 -60 145 -60q85 0 145 60t60 145v410q0 -85 60 -145t145 -60h205q170 0 289 120q120 120 120 289v615q0 84 -60 145q-60 59 -144 59q-85 0 -145 -59q-60 -61 -60 -145v-512q0 -43 -30 -73
q-27 -26 -63 -29h-224q-36 3 -63 29q-30 30 -30 73v512q0 84 -60 145q-60 59 -145 59v0z"
          />
        </svg>
      </div>

      <div @dragstart="dragStart" draggable="true" class="mr-1">
        <!-- -->
        <svg
          class="h-16 cursor-move"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          version="1.1"
          viewBox="-10 0 839 2048"
        >
          <path
            fill="currentColor"
            d="M204 1229q-84 0 -145 -60q-59 -60 -59 -145t59 -145q61 -60 145 -60h410q85 0 145 60t60 145t-60 145t-145 60h-410z"
          />
        </svg>
      </div>

      <div @dragstart="dragStart" draggable="true" class="mr-1">
        <!-- -->
        <svg
          class="h-16 cursor-move"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          version="1.1"
          viewBox="-10 0 429 2048"
        >
          <path
            fill="currentColor"
            d="M204 1638q-84 0 -145 -59q-59 -61 -59 -145v-768q0 -85 59 -145q61 -60 145 -60q85 0 145 60t60 145v768q0 84 -60 145q-60 59 -145 59v0zM204 410q-84 0 -145 -60q-59 -60 -59 -145t59 -145q61 -60 145 -60q85 0 145 60t60 145t-60 145t-145 60v0z"
          />
        </svg>
      </div>

      <div @dragstart="dragStart" draggable="true" class="mr-1">
        <!-- -->
        <svg
          class="h-16 cursor-move"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          version="1.1"
          viewBox="-10 0 839 2048"
        >
          <path
            fill="currentColor"
            d="M409 2047q-170 0 -289 -120q-120 -120 -120 -289v-40q0 -17 59 -29q61 -12 145 -12q85 0 145 12t60 29v-932q0 -85 60 -145t145 -60t145 60t60 145v972q0 169 -120 289t-290 120v0zM614 410q-85 0 -145 -60t-60 -145t60 -145t145 -60t145 60t60 145t-60 145t-145 60v0z
"
          />
        </svg>
      </div>

      <div @dragstart="dragStart" draggable="true" class="mr-1">
        <!-- -->
        <svg
          class="h-16 cursor-move"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          version="1.1"
          viewBox="-10 0 839 2048"
        >
          <path
            fill="currentColor"
            d="M204 1638q-84 0 -145 -59q-59 -61 -59 -145v-1229q0 -85 59 -145q61 -60 145 -60q85 0 145 60t60 145v409q0 -84 60 -144t145 -60t145 60t60 144q0 85 -60 145t-145 60q85 0 145 60t60 145v410q0 84 -60 145q-60 59 -145 59t-145 -59q-60 -61 -60 -145q0 84 -60 145
q-60 59 -145 59v0z"
          />
        </svg>
      </div>

      <div @dragstart="dragStart" draggable="true" class="mr-1">
        <!-- -->
        <svg
          class="h-16 cursor-move"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          version="1.1"
          viewBox="-10 0 839 2048"
        >
          <path
            fill="currentColor"
            d="M204 1638q-84 0 -145 -59q-59 -61 -59 -145v-1229q0 -85 59 -145q61 -60 145 -60q85 0 145 60t60 145v921q0 43 30 73t73 30h102q85 0 145 60t60 145q0 84 -60 145q-60 59 -145 59h-410z"
          />
        </svg>
      </div>

      <div @dragstart="dragStart" draggable="true" class="mr-1">
        <!-- -->
        <svg
          class="h-16 cursor-move"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          version="1.1"
          viewBox="-10 0 1248 2048"
        >
          <path
            fill="currentColor"
            d="M204 1638q-84 0 -145 -59q-59 -61 -59 -145v-819q0 -85 59 -145q61 -60 145 -60h205q85 0 145 60t60 144q0 -84 60 -144t145 -60h205q84 0 144 60t60 144v820q0 84 -60 145q-60 59 -144 59q-85 0 -145 -59q-60 -61 -60 -145v-410q0 85 -60 145t-145 60t-145 -60t-60 -145
v410q0 84 -60 145q-60 59 -145 59v0z"
          />
        </svg>
      </div>

      <div @dragstart="dragStart" draggable="true" class="mr-1">
        <!-- -->
        <svg
          class="h-16 cursor-move"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          version="1.1"
          viewBox="-10 0 1248 2048"
        >
          <path
            fill="currentColor"
            d="M204 1638q-84 0 -145 -59q-59 -61 -59 -145v-820q0 -84 59 -144q61 -60 145 -60q85 0 145 60t60 144v1q0 -85 60 -145t145 -60h205q170 0 289 120q120 120 120 289v615q0 84 -60 145q-60 59 -144 59q-85 0 -145 -59q-60 -61 -60 -145v-512q0 -43 -30 -73q-27 -26 -63 -29
h-224q-36 3 -63 29q-30 30 -30 73v512q0 84 -60 145q-60 59 -145 59v0z"
          />
        </svg>
      </div>

      <div @dragstart="dragStart" draggable="true" class="mr-1">
        <!-- -->
        <svg
          class="h-16 cursor-move"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          version="1.1"
          viewBox="-10 0 1248 2048"
        >
          <path
            fill="currentColor"
            d="M716 819q43 0 73 -30t30 -72v-205q0 -42 -30 -72t-73 -30h-204q-43 0 -73 30t-30 72v205q0 42 30 72t73 30h204zM1024 1638q-85 0 -145 -59q-60 -61 -60 -145v-205h-410q-170 0 -289 -120q-120 -120 -120 -290v-409q0 -170 120 -290t289 -120h410q170 0 289 120
q120 120 120 290v1024q0 84 -60 145q-60 59 -144 59v0z"
          />
        </svg>
      </div>

      <div @dragstart="dragStart" draggable="true" class="mr-1">
        <!-- -->
        <svg
          class="h-16 cursor-move"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          version="1.1"
          viewBox="-10 0 1248 2048"
        >
          <path
            fill="currentColor"
            d="M716 1229q43 0 73 -30t30 -73v-204q0 -43 -30 -73t-73 -30h-204q-43 0 -73 30t-30 73v204q0 43 30 73t73 30h204zM409 1638q-170 0 -289 -120q-120 -120 -120 -289v-410q0 -170 120 -289q120 -120 289 -120h410q170 0 289 120q120 120 120 289v410q0 170 -120 289
q-120 120 -289 120h-410z"
          />
        </svg>
      </div>

      <div @dragstart="dragStart" draggable="true" class="mr-1">
        <!-- -->
        <svg
          class="h-16 cursor-move"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          version="1.1"
          viewBox="-10 0 839 2048"
        >
          <path
            fill="currentColor"
            d="M614 1638q-85 0 -145 -59q-60 -61 -60 -145v-615h-205q-84 0 -145 -60q-59 -60 -59 -145q0 -84 59 -144q61 -60 145 -60h103q42 0 72 -30t30 -73v-102q0 -85 60 -145t145 -60t145 60t60 145v1229q0 84 -60 145q-60 59 -145 59v0z"
          />
        </svg>
      </div>

      <div @dragstart="dragStart" draggable="true" class="mr-1">
        <!-- -->
        <svg
          class="h-16 cursor-move"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          version="1.1"
          viewBox="-10 0 1248 2048"
        >
          <path
            fill="currentColor"
            d="M716 1229q43 0 73 -30t30 -73v-204q0 -43 -30 -73q-27 -26 -63 -29h-224q-36 3 -63 29q-30 30 -30 73v204q0 43 30 73t73 30h204zM204 2047q-84 0 -145 -60q-59 -60 -59 -145v-1228q0 -84 59 -144q61 -60 145 -60q85 0 145 60t60 144v1q0 -85 60 -145t145 -60h205
q170 0 289 120q120 120 120 289v410q0 170 -120 289q-120 120 -289 120h-205q-85 0 -145 -59q-60 -61 -60 -145v408q0 85 -60 145t-145 60v0z"
          />
        </svg>
      </div>

      <div @dragstart="dragStart" draggable="true" class="mr-1">
        <!-- -->
        <svg
          class="h-16 cursor-move"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          version="1.1"
          viewBox="-10 0 829 2048"
        >
          <path
            fill="currentColor"
            d="M409 1638q-170 0 -289 -120q-120 -120 -120 -289v-819q0 -170 120 -290t289 -120q85 0 145 60t60 145t-60 145t-145 60v819q85 0 145 60t60 145q0 84 -60 145q-60 59 -145 59v0z"
          />
        </svg>
      </div>

      <div @dragstart="dragStart" draggable="true" class="mr-1">
        <!-- -->
        <svg
          class="h-16 cursor-move"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          version="1.1"
          viewBox="-10 0 839 2048"
        >
          <path
            fill="currentColor"
            d="M409 1638q-85 0 -145 -59q-60 -61 -60 -145q0 -85 60 -145t145 -60v-819q-85 0 -145 -60t-60 -145t60 -145t145 -60q170 0 290 120t120 290v819q0 169 -120 289t-290 120v0z"
          />
        </svg>
      </div>

      <div @dragstart="dragStart" draggable="true" class="mr-1">
        <!-- -->
        <svg
          class="h-16 cursor-move"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          version="1.1"
          viewBox="-10 0 429 2048"
        >
          <path
            fill="currentColor"
            d="M204 1638q-84 0 -145 -59q-59 -61 -59 -145q0 -85 59 -145q61 -60 145 -60q85 0 145 60t60 145q0 84 -60 145q-60 59 -145 59v0z"
          />
        </svg>
      </div>

      <div @dragstart="dragStart" draggable="true" class="mr-1">
        <!-- -->
        <svg
          class="h-16 cursor-move"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          version="1.1"
          viewBox="-10 0 1248 2048"
        >
          <path
            fill="currentColor"
            d="M614 1638q-85 0 -145 -59q-60 -61 -60 -145v-205h-205q-84 0 -145 -60q-59 -60 -59 -145t59 -145q61 -60 145 -60h205v-205q0 -84 60 -144t145 -60t145 60t60 144v205h205q84 0 144 60t60 145t-60 145t-144 60h-205v205q0 84 -60 145q-60 59 -145 59v0z"
          />
        </svg>
      </div>

      <div @dragstart="dragStart" draggable="true" class="mr-1">
        <!-- -->
        <svg
          class="h-16 cursor-move"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          version="1.1"
          viewBox="-10 0 1248 2048"
        >
          <path
            fill="currentColor"
            d="M716 1229q43 0 73 -30t30 -73v-204q0 -43 -30 -73q-27 -26 -63 -29h-224q-36 3 -63 29q-30 30 -30 73v204q0 43 30 73t73 30h204zM1024 2047q-85 0 -145 -60t-60 -145v-408q0 84 -60 145q-60 59 -145 59h-205q-169 0 -289 -120q-120 -119 -120 -289v-410q0 -169 120 -289
q119 -120 289 -120h205q85 0 145 60t60 145v-1q0 -84 60 -144t145 -60q84 0 144 60t60 144v1228q0 85 -60 145t-144 60v0z"
          />
        </svg>
      </div>

      <div @dragstart="dragStart" draggable="true" class="mr-1">
        <!-- -->
        <svg
          class="h-16 cursor-move"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          version="1.1"
          viewBox="-10 0 1248 2048"
        >
          <path
            fill="currentColor"
            d="M546 1638q-57 0 -97 -30t-40 -72v-102q0 -43 40 -73t97 -30h136q57 0 97 30t40 73v102q0 43 -40 72q-40 30 -97 30h-136zM614 1229q-85 0 -145 -60t-60 -145t60 -145t145 -60h205v-409h-410v204q0 85 -60 145t-145 60q-84 0 -145 -60q-59 -60 -59 -145v-204
q0 -170 120 -290t289 -120h410q170 0 289 120q120 120 120 290v409q0 170 -120 290t-289 120h-205z"
          />
        </svg>
      </div>

      <div @dragstart="dragStart" draggable="true" class="mr-1">
        <!-- -->
        <svg
          class="h-16 cursor-move"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          version="1.1"
          viewBox="-10 0 429 2048"
        >
          <path
            fill="currentColor"
            d="M0 410v-410h163v410h-163zM245 410v-410h164v410h-164z"
          />
        </svg>
      </div>

      <div @dragstart="dragStart" draggable="true" class="mr-1">
        <!-- -->
        <svg
          class="h-16 cursor-move"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          version="1.1"
          viewBox="-10 0 1238 2048"
        >
          <path
            fill="currentColor"
            d="M204 614l-204 -204v-205q0 -85 59 -145q61 -60 145 -60q85 0 145 60t60 145t-60 145t-145 60v204v0zM665 614l-205 -204v-205q0 -85 60 -145t145 -60t145 60t60 145t-60 145t-145 60v204v0z"
          />
        </svg>
      </div>

      <div @dragstart="dragStart" draggable="true" class="mr-1">
        <!-- -->
        <svg
          class="h-16 cursor-move"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          version="1.1"
          viewBox="-10 0 1238 2048"
        >
          <path
            fill="currentColor"
            d="M204 614v-204q-84 0 -145 -60q-59 -60 -59 -145t59 -145q61 -60 145 -60q85 0 145 60t60 145v205l-205 204v0zM665 614v-204q-85 0 -145 -60t-60 -145t60 -145t145 -60t145 60t60 145v205l-205 204v0z"
          />
        </svg>
      </div>

      <div @dragstart="dragStart" draggable="true" class="mr-1">
        <!-- -->
        <svg
          class="h-16 cursor-move"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          version="1.1"
          viewBox="-10 0 429 2048"
        >
          <path
            fill="currentColor"
            d="M204 614l-204 -204v-205q0 -85 59 -145q61 -60 145 -60q85 0 145 60t60 145t-60 145t-145 60v204v0z"
          />
        </svg>
      </div>

      <div @dragstart="dragStart" draggable="true" class="mr-1">
        <!-- -->
        <svg
          class="h-16 cursor-move"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          version="1.1"
          viewBox="-10 0 429 2048"
        >
          <path
            fill="currentColor"
            d="M204 614v-204q-84 0 -145 -60q-59 -60 -59 -145t59 -145q61 -60 145 -60q85 0 145 60t60 145v205l-205 204v0z"
          />
        </svg>
      </div>

      <div @dragstart="dragStart" draggable="true" class="mr-1">
        <!-- -->
        <svg
          class="h-16 cursor-move"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          version="1.1"
          viewBox="-10 0 429 2048"
        >
          <path fill="currentColor" d="M102 410v-410h307v410h-307z" />
        </svg>
      </div>

      <div @dragstart="dragStart" draggable="true" class="mr-1">
        <!-- -->
        <svg
          class="h-16 cursor-move"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          version="1.1"
          viewBox="-10 0 839 2048"
        >
          <path
            fill="currentColor"
            d="M204 1638q-84 0 -145 -59q-59 -61 -59 -145v-820q0 -84 59 -144q61 -60 145 -60q85 0 145 60t60 144q0 -84 60 -144t145 -60t145 60t60 144q0 85 -60 145t-145 60h-102q-43 0 -73 30t-30 73v512q0 84 -60 145q-60 59 -145 59v0z"
          />
        </svg>
      </div>

      <div @dragstart="dragStart" draggable="true" class="mr-1">
        <!-- -->
        <svg
          class="h-16 cursor-move"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          version="1.1"
          viewBox="-10 0 1248 2048"
        >
          <path
            fill="currentColor"
            d="M136 1638q-57 0 -96 -24q-40 -24 -40 -57v-164q0 -34 40 -58t96 -24h614q29 0 49 -12t20 -29t-20 -29t-49 -12h-546q-84 0 -145 -60q-59 -60 -59 -145v-409q0 -85 59 -145q61 -60 145 -60h820q84 0 144 60t60 144q0 85 -60 145t-144 60h-564q-21 0 -36 15t-15 36
q0 22 15 37t36 15h666q42 0 72 30t30 72v410q0 84 -60 145q-60 59 -144 59h-888z"
          />
        </svg>
      </div>

      <div @dragstart="dragStart" draggable="true" class="mr-1">
        <!-- -->
        <svg
          class="h-16 cursor-move"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          version="1.1"
          viewBox="-10 0 429 2048"
        >
          <path
            fill="currentColor"
            d="M204 1842v-204q-84 0 -145 -59q-59 -61 -59 -145q0 -85 59 -145q61 -60 145 -60q85 0 145 60t60 145v204l-205 204v0zM204 819q-84 0 -145 -60q-59 -60 -59 -145q0 -84 59 -144q61 -60 145 -60q85 0 145 60t60 144q0 85 -60 145t-145 60v0z"
          />
        </svg>
      </div>

      <div @dragstart="dragStart" draggable="true" class="mr-1">
        <!-- -->
        <svg
          class="h-16 cursor-move"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          version="1.1"
          viewBox="-10 0 1248 2048"
        >
          <path
            fill="currentColor"
            d="M614 1638q-85 0 -145 -59q-60 -61 -60 -145v-820l205 -204h-410q-84 0 -145 -60q-59 -60 -59 -145t59 -145q61 -60 145 -60h820q84 0 144 60t60 145v409l-409 410v410q0 84 -60 145q-60 59 -145 59v0z"
          />
        </svg>
      </div>

      <div @dragstart="dragStart" draggable="true" class="mr-1">
        <!-- -->
        <svg
          class="h-16 cursor-move"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          version="1.1"
          viewBox="-10 0 1248 2048"
        >
          <path
            fill="currentColor"
            d="M716 1229q43 0 73 -30t30 -73v-204q0 -43 -30 -73t-73 -30h-204q-43 0 -73 30t-30 73v204q0 43 30 73t73 30h204zM409 1638q-170 0 -289 -120q-120 -120 -120 -289v-819q0 -170 120 -290t289 -120h273q57 0 97 24t40 58v164q0 34 -40 58t-97 24h-205q-28 0 -48 12t-20 29
t20 29t48 12h342q170 0 289 120q120 120 120 289v410q0 170 -120 289q-120 120 -289 120h-410z"
          />
        </svg>
      </div>

      <div @dragstart="dragStart" draggable="true" class="mr-1">
        <!-- -->
        <svg
          class="h-16 cursor-move"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          version="1.1"
          viewBox="-10 0 839 2048"
        >
          <path
            fill="currentColor"
            d="M0 1638v-409l614 -1229h205v410l-615 1228h-204z"
          />
        </svg>
      </div>

      <div @dragstart="dragStart" draggable="true" class="mr-1">
        <!-- -->
        <svg
          class="h-16 cursor-move"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          version="1.1"
          viewBox="-10 0 419 2048"
        >
          <g />
        </svg>
      </div>

      <div @dragstart="dragStart" draggable="true" class="mr-1">
        <!-- -->
        <svg
          class="h-16 cursor-move"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          version="1.1"
          viewBox="-10 0 1248 2048"
        >
          <path
            fill="currentColor"
            d="M614 1638q-85 0 -145 -59q-60 -61 -60 -145v-615h-205q-84 0 -145 -60q-59 -60 -59 -145q0 -84 59 -144q61 -60 145 -60h205v-205q0 -85 60 -145t145 -60t145 60t60 145v205h205q84 0 144 60t60 144q0 85 -60 145t-144 60h-205v615q0 84 -60 145q-60 59 -145 59v0z"
          />
        </svg>
      </div>

      <div @dragstart="dragStart" draggable="true" class="mr-1">
        <!-- -->
        <svg
          class="h-16 cursor-move"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          version="1.1"
          viewBox="-10 0 1248 2048"
        >
          <path
            fill="currentColor"
            d="M204 1638q-84 0 -145 -59q-59 -61 -59 -145q0 -85 59 -145q61 -60 145 -60h512q43 0 73 -30t30 -73v-204q0 -43 -30 -73t-73 -30h-102q-85 0 -145 -60t-60 -145q0 -84 60 -144t145 -60h-410q-84 0 -145 -60q-59 -60 -59 -145t59 -145q61 -60 145 -60h1024v205l-204 205
q84 0 144 60t60 144v615q0 170 -120 289q-120 120 -289 120h-615z"
          />
        </svg>
      </div>

      <div @dragstart="dragStart" draggable="true" class="mr-1">
        <!-- -->
        <svg
          class="h-16 cursor-move"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          version="1.1"
          viewBox="-10 0 1248 2048"
        >
          <path
            fill="currentColor"
            d="M204 1638q-84 0 -145 -59q-59 -61 -59 -145v-410l614 -614h-410q-84 0 -145 -60q-59 -60 -59 -145t59 -145q61 -60 145 -60h615q170 0 289 120q120 120 120 290v204l-614 615h410q84 0 144 60t60 145q0 84 -60 145q-60 59 -144 59h-820z"
          />
        </svg>
      </div>

      <div @dragstart="dragStart" draggable="true" class="mr-1">
        <!-- -->
        <svg
          class="h-16 cursor-move"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          version="1.1"
          viewBox="-10 0 1248 2048"
        >
          <path
            fill="currentColor"
            d="M409 1638q-170 0 -289 -120q-120 -120 -120 -289v-615q0 -84 59 -144q61 -60 145 -60q85 0 145 60t60 144v512q0 43 30 73t73 30h204q43 0 73 -30t30 -73v-512q0 -84 60 -144t145 -60q84 0 144 60t60 144v820q0 84 -60 145q-60 59 -144 59q-85 0 -145 -59
q-60 -61 -60 -145q0 84 -60 145q-60 59 -145 59h-205z"
          />
        </svg>
      </div>

      <div @dragstart="dragStart" draggable="true" class="mr-1">
        <!-- -->
        <svg
          class="h-16 cursor-move"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          version="1.1"
          viewBox="-10 0 839 2048"
        >
          <path
            fill="currentColor"
            d="M204 1638q-84 0 -145 -59q-59 -61 -59 -145q0 -85 59 -145q61 -60 145 -60h410q85 0 145 60t60 145q0 84 -60 145q-60 59 -145 59h-410z"
          />
        </svg>
      </div>

      <div @dragstart="dragStart" draggable="true" class="mr-1">
        <!-- -->
        <svg
          class="h-16 cursor-move"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          version="1.1"
          viewBox="-10 0 1248 2048"
        >
          <path
            fill="currentColor"
            d="M614 1638l-614 -614v-410q0 -84 59 -144q61 -60 145 -60q85 0 145 60t60 144v207l205 203l205 -205v-205q0 -84 60 -144t145 -60q84 0 144 60t60 144v410l-614 614v0z"
          />
        </svg>
      </div>

      <div @dragstart="dragStart" draggable="true" class="mr-1">
        <!-- -->
        <svg
          class="h-16 cursor-move"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          version="1.1"
          viewBox="-10 0 1248 2048"
        >
          <path
            fill="currentColor"
            d="M204 1638q-84 0 -145 -60q-59 -60 -59 -145v-819q0 -84 59 -144q61 -60 145 -60q85 0 145 60t60 144v410q0 -85 60 -145t145 -60t145 60t60 145v-410q0 -84 60 -144t145 -60q84 0 144 60t60 144v820q0 84 -60 145q-60 59 -144 59h-205q-85 0 -145 -59q-60 -61 -60 -145
q0 84 -60 145q-60 59 -145 59h-205z"
          />
        </svg>
      </div>

      <div @dragstart="dragStart" draggable="true" class="mr-1">
        <!-- -->
        <svg
          class="h-16 cursor-move"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          version="1.1"
          viewBox="-10 0 1248 2048"
        >
          <path
            fill="currentColor"
            d="M204 1638q-84 0 -145 -59q-59 -61 -59 -145q0 -85 59 -145q61 -60 145 -60h103q42 0 72 -30t30 -73v-204q0 -43 -30 -73t-72 -30h-103q-84 0 -145 -60q-59 -60 -59 -145q0 -84 59 -144q61 -60 145 -60q85 0 145 60t60 144v103q0 42 30 72t73 30h204q43 0 73 -30t30 -72
v-103q0 -84 60 -144t145 -60q84 0 144 60t60 144q0 85 -60 145t-144 60h-103q-42 0 -72 30t-30 73v204q0 43 30 73t72 30h103q80 0 144 70q60 66 60 135q0 84 -60 145q-60 59 -144 59q-85 0 -145 -59q-60 -61 -60 -145v-103q0 -42 -30 -72t-73 -30h-204q-43 0 -73 30t-30 72
v103q0 84 -60 145q-60 59 -145 59v0z"
          />
        </svg>
      </div>

      <div @dragstart="dragStart" draggable="true" class="mr-1">
        <!-- -->
        <svg
          class="h-16 cursor-move"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          version="1.1"
          viewBox="-10 0 1248 2048"
        >
          <path
            fill="currentColor"
            d="M409 2047q-170 0 -289 -120q-120 -120 -120 -289v-40q0 -17 59 -29q61 -12 145 -12q85 0 145 12t60 29v-28q0 28 20 49q20 19 48 19h273q29 0 49 -19q20 -21 20 -49v-273q0 -28 -20 -48t-49 -20h-341q-170 0 -289 -120q-120 -120 -120 -290v-205q0 -84 59 -144
q61 -60 145 -60q85 0 145 60t60 144v103q0 42 30 72t73 30h204q43 0 73 -30t30 -72v-103q0 -84 60 -144t145 -60q84 0 144 60t60 144v1024q0 169 -120 289t-289 120h-410z"
          />
        </svg>
      </div>

      <div @dragstart="dragStart" draggable="true" class="mr-1">
        <!-- -->
        <svg
          class="h-16 cursor-move"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          version="1.1"
          viewBox="-10 0 1248 2048"
        >
          <path
            fill="currentColor"
            d="M0 1638v-204l409 -410v-205h-205q-84 0 -145 -60q-59 -60 -59 -145q0 -84 59 -144q61 -60 145 -60h1024v204l-409 410v205h205q84 0 144 60t60 145q0 84 -60 145q-60 59 -144 59h-1024z"
          />
        </svg>
      </div>

      <div @dragstart="dragStart" draggable="true" class="mr-1">
        <!-- -->
        <svg
          class="h-16 cursor-move"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          version="1.1"
          viewBox="-10 0 1248 2048"
        >
          <path
            fill="currentColor"
            d="M716 1229q43 0 73 -30t30 -73v-614q0 -42 -30 -72t-73 -30h-204q-43 0 -73 30t-30 72v614q0 43 30 73t73 30h204zM204 1638q-84 0 -145 -59q-59 -61 -59 -145v-1229q0 -84 59 -145q61 -60 145 -60h820q84 0 144 60t60 145v1229q0 84 -60 145q-60 59 -144 59h-820z"
          />
        </svg>
      </div>

      <div @dragstart="dragStart" draggable="true" class="mr-1">
        <!--^ -->
        <svg
          class="h-16 cursor-move"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          version="1.1"
          viewBox="-10 0 1248 2048"
        >
          <path
            fill="currentColor"
            d="M204 819l-204 -205l614 -614l614 614l-204 205h-205v-1l-205 -204l-205 205h-205z"
          />
        </svg>
      </div>

      <div @dragstart="dragStart" draggable="true" class="mr-1">
        <!--~ -->
        <svg
          class="h-16 cursor-move"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          version="1.1"
          viewBox="-10 0 1248 2048"
        >
          <path
            fill="currentColor"
            d="M204 819q-84 0 -145 -60q-59 -60 -59 -145q0 -84 59 -144q61 -60 145 -60h410q85 0 145 60t60 144q0 -84 60 -144t145 -60q84 0 144 60t60 144q0 85 -60 145t-144 60h-410q-85 0 -145 -60t-60 -145q0 85 -60 145t-145 60v0z"
          />
        </svg>
      </div>

      <div @dragstart="dragStart" draggable="true" class="mr-1">
        <!--* -->
        <svg
          class="h-16 cursor-move"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          version="1.1"
          viewBox="-10 0 829 2048"
        >
          <path
            fill="currentColor"
            d="M409 614q0 -84 -60 -144t-145 -60q85 0 145 -60t60 -145q0 85 60 145t145 60q-85 0 -145 60t-60 144v0z"
          />
        </svg>
      </div>

      <div @dragstart="dragStart" draggable="true" class="mr-1">
        <!--\ -->
        <svg
          class="h-16 cursor-move"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          version="1.1"
          viewBox="-10 0 839 2048"
        >
          <path
            fill="currentColor"
            d="M614 1638l-614 -1228v-410h204l615 1229v409h-205z"
          />
        </svg>
      </div>

      <div @dragstart="dragStart" draggable="true" class="mr-1">
        <!--| -->
        <svg
          class="h-16 cursor-move"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          version="1.1"
          viewBox="-10 0 429 2048"
        >
          <path
            fill="currentColor"
            d="M204 1996q-84 0 -145 -60q-59 -60 -59 -145v-1586q0 -85 59 -145q61 -60 145 -60q85 0 145 60t60 145v1586q0 85 -60 145t-145 60v0z"
          />
        </svg>
      </div>

      <div @dragstart="dragStart" draggable="true" class="mr-1">
        <!--{ -->
        <svg
          class="h-16 cursor-move"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          version="1.1"
          viewBox="-10 0 839 2048"
        >
          <path
            fill="currentColor"
            d="M819 1638q-170 0 -290 -120t-120 -289v-205q0 -85 -60 -145t-145 -60q85 0 145 -60t60 -145v-204q0 -170 120 -290t290 -120v410q0 170 -120 289q-120 120 -290 120q170 0 290 120t120 290v409v0z"
          />
        </svg>
      </div>

      <div @dragstart="dragStart" draggable="true" class="mr-1">
        <!--} -->
        <svg
          class="h-16 cursor-move"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          version="1.1"
          viewBox="-10 0 829 2048"
        >
          <path
            fill="currentColor"
            d="M0 1638v-409q0 -170 120 -290q119 -120 289 -120q-169 0 -289 -120q-120 -119 -120 -289v-410q169 0 289 120t120 290v204q0 85 60 145t145 60q-85 0 -145 60t-60 145v205q0 169 -120 289t-289 120v0z"
          />
        </svg>
      </div>

      <div @dragstart="dragStart" draggable="true" class="mr-1">
        <!--[ -->
        <svg
          class="h-16 cursor-move"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          version="1.1"
          viewBox="-10 0 839 2048"
        >
          <path
            fill="currentColor"
            d="M204 1638q-84 0 -145 -59q-59 -61 -59 -145v-1229q0 -84 59 -145q61 -60 145 -60h410q85 0 145 60t60 145t-60 145t-145 60h-205v819h205q85 0 145 60t60 145q0 84 -60 145q-60 59 -145 59h-410z"
          />
        </svg>
      </div>

      <div @dragstart="dragStart" draggable="true" class="mr-1">
        <!--] -->
        <svg
          class="h-16 cursor-move"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          version="1.1"
          viewBox="-10 0 839 2048"
        >
          <path
            fill="currentColor"
            d="M204 1638q-84 0 -145 -59q-59 -61 -59 -145q0 -85 59 -145q61 -60 145 -60h205v-819h-205q-84 0 -145 -60q-59 -60 -59 -145t59 -145q61 -60 145 -60h410q85 0 145 60t60 145v1229q0 84 -60 145q-60 59 -145 59h-410z"
          />
        </svg>
      </div>

      <div @dragstart="dragStart" draggable="true" class="mr-1">
        <!--: -->
        <svg
          class="h-16 cursor-move"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          version="1.1"
          viewBox="-10 0 429 2048"
        >
          <path
            fill="currentColor"
            d="M204 1638q-84 0 -145 -59q-59 -61 -59 -145q0 -85 59 -145q61 -60 145 -60q85 0 145 60t60 145q0 84 -60 145q-60 59 -145 59v0zM204 819q-84 0 -145 -60q-59 -60 -59 -145q0 -84 59 -144q61 -60 145 -60q85 0 145 60t60 144q0 85 -60 145t-145 60v0z"
          />
        </svg>
      </div>

      <div @dragstart="dragStart" draggable="true" class="mr-1">
        <!--, -->
        <svg
          class="h-16 cursor-move"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          version="1.1"
          viewBox="-10 0 429 2048"
        >
          <path
            fill="currentColor"
            d="M204 1842v-204q-84 0 -145 -59q-59 -61 -59 -145q0 -85 59 -145q61 -60 145 -60q85 0 145 60t60 145v204l-205 204v0z"
          />
        </svg>
      </div>

      <div @dragstart="dragStart" draggable="true" class="mr-1">
        <!--$ -->
        <svg
          class="h-16 cursor-move"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          version="1.1"
          viewBox="-10 0 1248 2048"
        >
          <path
            fill="currentColor"
            d="M819 1229v-410h-51v410h51zM563 1719q-85 0 -145 -12t-60 -29v-40h-154q-84 0 -145 -59q-59 -61 -59 -145q0 -85 59 -145q61 -60 145 -60h154v-410h51q-170 0 -289 -120q-120 -120 -120 -289q0 -170 120 -290t289 -120h615q84 0 144 60t60 145t-60 145t-144 60h-205
q170 0 289 120q120 120 120 289v410q0 170 -120 289q-120 120 -289 120h-51v40q0 17 -60 29q-61 12 -145 12v0z"
          />
        </svg>
      </div>
    </div>
  </accordian-panel>
</template>

<script lang="ts">
import Vue from "vue";
import AccordianPanel from "~/components/Design/Sidebar/AccordianPanel.vue";

export default Vue.extend({
  components: {
    AccordianPanel,
  },
  methods: {
    dragStart(event: DragEvent) {
      const { target, offsetX, offsetY } = event;
      const path = (target as HTMLDivElement)
        .getElementsByTagName("path")[0]
        .getAttribute("d");
      this.$store.commit("designMeta/setDraggingItem", {
        type: "svg",
        data: path,
        offsetX,
        offsetY,
      });
    },
  },
});
</script>

<style>
</style>