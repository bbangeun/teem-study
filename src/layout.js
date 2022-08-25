/* eslint-disable */
import BlankTile from "./BlankTile.svelte";
// import GridControl from "./GridControl.svelte";
//add your components here

export let tileTypes = [
  { name: 'blank tile', component: BlankTile}
  //add your components here if you want to be able to add them from the toolbar
]

export let layout = [
//   { "key": 1,
//     "type": GridControl,
//     "position": {"colStart": 1, "colEnd": 8, "rowStart": 1, "rowEnd": 3, "zIndex": 2005}
//   },
  { "key": 2,
    "type": BlankTile,
    "position": {"colStart": 4, "colEnd": 12, "rowStart": 2, "rowEnd": 5, "zIndex": 2000}
  },
	{ "key": 3,
    "type": BlankTile,
    "position": {"colStart": 2, "colEnd": 14, "rowStart": 8, "rowEnd": 13, "zIndex": 2001}
  },
  { "key": 4,
    "type": BlankTile,
    "position": {"colStart": 10, "colEnd": 16, "rowStart": 12, "rowEnd": 17, "zIndex": 2000}
  },
	{ "key": 5,
    "type": BlankTile,
    "position": {"colStart": 8, "colEnd": 11, "rowStart": 6, "rowEnd": 10, "zIndex": 2001}
  },
]