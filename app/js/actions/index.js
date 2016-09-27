// Actions in Redux :D

export function selectMod(name, script, url){
  return {
    type: 'selectMod',
    name,
    script,
    url
  }
}

export function selectDirectory(path){
  return {
    type: 'selectDirectory',
    path
  }
}

export function progressInfo(text, progress){
  return {
    type: 'progressInfo',
    text,
    progress
  }
}
