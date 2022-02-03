import {createDomain} from "effector";

const d = createDomain('Model')

export const add = d.createEvent()

export const $count = d.createStore(0)
$count.on(add, (count) => count + 1)
