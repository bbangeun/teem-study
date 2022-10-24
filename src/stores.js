/* eslint-disable */
import { writable, derived } from 'svelte/store';

export let unlockTiles = writable(false);
export let showDrops = writable(false);
export let activeTile = writable(null);
export let dropTarget = writable(null);
export let dragOrigin = writable(null);

export let currentLayout = writable([]);

export let ViewList = writable([]); //윤 추가

export const apiData = writable([]);

export const drinkNames = derived(apiData, ($apiData) => {
  if ($apiData.drinks){
    return $apiData.drinks.map(drink => drink.strDrink);
  }
  return [];
});

export let g_DragSourceElement = writable(null);
export let g_IsDropSafeZone    = writable(false);

export  class  ViewBox{
    constructor(Index, PID, Type, HRatio, VRatio, V1, V2, Title, Display){
     this.Index = Index,
     this.PID   = PID,
     this.Type  = Type,
     this.Title = Title;
     this.HRatio = HRatio,        
     this.VRatio = VRatio,        
     this.V1   = V1,
     this.V2   = V2;
     this.HRealRatio = "calc({HRatio} - 10px)"        
     this.VRealRatio = "calc({VRatio} - 10px)"  
     this.Offset = (((V1 > 0) && (V2 > 0)) || (PID > 0)) ? '10px' : '0px';
     //this.Display = (this.Type === 'H') ? 'inline-flex' : 'Block';
     this.Display = Display;     
     this.Param ='';             
   }
   GetSaveParam(){
    return this.Index+','+this.PID+','+this.Type+','+this.HRatio+','+this.VRatio+','+this.V1+','+this.V2+','+this.Display;
   }
 }

 export class DragStartResult{
  constructor(Index,Event){
    this.Index   = Index,
    this.Event   = Event   
  }
 }

