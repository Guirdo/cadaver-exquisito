import { For, Show, createResource, createSignal, onMount } from 'solid-js'
import { t } from '../../i18n'
import { getArchive, getArchiveCount } from '../../stores/public_room'
import { A } from '@solidjs/router'
import cutOffText from '../../utils/cutOffText'

export default function ArchivePage() {
    const [currentPage, setCurrentPage] = createSignal(0)
    const [count, setCount] = createSignal(0)
    const [archive] = createResource(currentPage, getArchive)

    onMount(() => {
        getArchiveCount()
            .then((count) => setCount(Math.ceil(count / 10)))
    })

    return (
        <div class="[ flex-column ] [ w-100 h-100 gap-lg p-md align-items-center ]">
            <h1>{t('publicRoom.archive')}</h1>

            <Show when={archive.state === 'ready'} fallback={<p>{t('common.loading')}</p>}>
                <ul class="flex-grow">
                    <For each={archive()}>
                        {
                            (item) => <li>
                                <A href={`/p/${item.id}`}>
                                    {cutOffText(item.title)}
                                </A>
                            </li>
                        }
                    </For>
                </ul>

                <div class="archive-pagination [ gap-xs align-items-center  ]">
                    <button
                        class="button fw-normal fs-sm"
                        onClick={() => setCurrentPage(current => current > 0 && current - 1)}
                        disabled={!(currentPage() > 0)}
                    >
                        {t('publicRoom.prev')}
                    </button>
                    <p>
                        {t('publicRoom.pagination', { currentPage: currentPage() + 1, count: count() })}
                    </p>
                    <button
                        class="button fw-normal fs-sm"
                        onClick={() => setCurrentPage(current => current < count() - 1 && current + 1)}
                        disabled={!(currentPage() < count() - 1)}
                    >
                        {t('publicRoom.next')}
                    </button>
                </div>
            </Show>
        </div>
    )
}
