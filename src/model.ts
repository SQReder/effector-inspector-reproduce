import {createDomain, createEvent, guard, sample} from "effector";
import {createGate} from "effector-react";
import {produce} from 'immer'

const d = createDomain('Model')

export const Gate = createGate({domain: d})

export type Author = { name: string }
export type Extras = { reverse: string };
type ExtrasByAuthorName = Record<string, Extras>;


const getAuthors = d.createEvent()

export const $authors = d.createStore<Author[]>([])

const getAuthorsFx = d.createEffect(async () => {
    return [
        {name: 'foo'},
        {name: 'bar'},
        {name: 'baz'},
    ]
})

$authors.on(getAuthorsFx.doneData, (_, x) => x)

sample({
    clock: getAuthors,
    target: getAuthorsFx,
})

sample({
    clock: Gate.open,
    target: getAuthors
})

export const getExtras = d.createEvent<Author>()
export const dropExtras = d.createEvent<Author>()
export const $extras = d.createStore<ExtrasByAuthorName>({})

const getExtrasFx = d.createEffect(async (author: Author): Promise<Extras> => {
    return {
        reverse: author.name.split('').reverse().join('')
    }
})

$extras.on(getExtrasFx.done, (values, {params: author, result: extras}) =>
    produce(values, draft => {
        draft[author.name] = extras
    }))
$extras.on(dropExtras, (values, author) =>
    produce(values, draft => {
        delete draft[author.name]
    }))

export const toggleExtras = createEvent<Author>()

// С переходом на effector 22.2.0 можно будет сделать из этого sample, но пока так
const toggleExtrasFx = d.createEffect(async ({author, extras}: { author: Author, extras: ExtrasByAuthorName }) => {
    if (extras[author.name]) {
        dropExtras(author)
    } else {
        getExtras(author)
    }
});

sample({
    clock: toggleExtras,
    source: {extras: $extras},
    fn: ({extras}, author) => ({
            author,
            extras
        }
    ),
    target: toggleExtrasFx,
})

sample({
    clock: getExtras,
    target: getExtrasFx
})
