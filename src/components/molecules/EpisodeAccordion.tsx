import * as Accordion from '@radix-ui/react-accordion';
import type { EpisodeDetail } from '../../const/movies';

interface EpisodeAccordionProps {
    episodes: EpisodeDetail[];
}

export const EpisodeAccordion = ({ episodes }: EpisodeAccordionProps) => {
    return (
        <Accordion.Root type='single' defaultValue='eps-2'>
            {episodes.map((ep) => (
                <Accordion.Item key={ep.id} value={ep.id.toString()}>
                    <Accordion.Header>
                        <Accordion.Trigger className='bg-other-extra data-[state=open]:bg-other-paper py-2 px-3 font-semibold text-text-light-primary w-full text-left'>
                            Episode {ep.episodeNumber}
                        </Accordion.Trigger>
                    </Accordion.Header>
                    <Accordion.Content className='bg-other-extra data-[state=open]:bg-other-paper grid grid-cols-2 gap-3 px-3 pb-2 transition-all duration-300 max-h-0 data-[state=open]:max-h-25'>
                        <img src={ep.thumbnail} alt="Preview" className='object-cover rounded-sm' />
                        <div className='text-sm'>
                            <h3 className='mb-2 font-bold'>{ep.title}</h3>
                            <p className='line-clamp-3'>{ep.description}</p>
                        </div>
                    </Accordion.Content>
                </Accordion.Item>
            ))}
        </Accordion.Root>
    );
};