import { useEffect, useMemo, useState, type ReactNode } from 'react';
import {
  BookOpen, Check, ChevronLeft, ChevronRight, CircleHelp, Copy, Download,
  Heart, House, Moon, Palette, Search, Settings, Share2, Sparkles, Sun,
} from 'lucide-react';
import { usePwa } from '@/pwa';
import './meuverso.css';

type Verse = { id: number; text: string; reference: string };
type Tab = 'today' | 'explore' | 'saved' | 'settings';
const verses: Verse[] = [
  { id: 1, text: 'O Senhor é o meu pastor; nada me faltará.', reference: 'Salmos 23:1' },
  { id: 2, text: 'Tudo posso naquele que me fortalece.', reference: 'Filipenses 4:13' },
  { id: 3, text: 'Porque Deus amou o mundo de tal maneira que deu o seu Filho unigênito, para que todo aquele que nele crê não pereça, mas tenha a vida eterna.', reference: 'João 3:16' },
  { id: 4, text: 'Entrega o teu caminho ao Senhor; confia nele, e o mais ele fará.', reference: 'Salmos 37:5' },
  { id: 5, text: 'O choro pode durar uma noite, mas a alegria vem pela manhã.', reference: 'Salmos 30:5' },
  { id: 6, text: 'Se Deus é por nós, quem será contra nós?', reference: 'Romanos 8:31' },
  { id: 7, text: 'Confia no Senhor de todo o teu coração e não te estribes no teu próprio entendimento.', reference: 'Provérbios 3:5' },
  { id: 8, text: 'Clama a mim, e responder-te-ei e anunciar-te-ei coisas grandes e firmes que não sabes.', reference: 'Jeremias 33:3' },
  { id: 9, text: 'Aquietai-vos, e sabei que eu sou Deus.', reference: 'Salmos 46:10' },
  { id: 10, text: 'Buscai primeiro o Reino de Deus e a sua justiça, e todas estas coisas vos serão acrescentadas.', reference: 'Mateus 6:33' },
  { id: 11, text: 'O Senhor é a minha luz e a minha salvação; a quem temerei?', reference: 'Salmos 27:1' },
  { id: 12, text: 'Bem-aventurados os que choram, porque serão consolados.', reference: 'Mateus 5:4' },
  { id: 13, text: 'Deleita-te também no Senhor, e ele te concederá os desejos do teu coração.', reference: 'Salmos 37:4' },
  { id: 14, text: 'O Senhor guarda a todos os que o amam, mas todos os ímpios ele destruirá.', reference: 'Salmos 145:20' },
  { id: 14, text: 'Não temas, porque eu sou contigo; não te assombres, porque eu sou o teu Deus; eu te fortaleço, e te ajudo, e te sustento com a destra da minha justiça.', reference: 'Isaías 41:10' },
  { id: 15, text: 'Lança o teu cuidado sobre o Senhor, e ele te susterá; jamais permitirá que o justo seja abalado.', reference: 'Salmos 55:22' },
  { id: 16, text: 'Sede fortes e corajosos; não temais, nem vos espanteis diante deles; porque o Senhor vosso Deus é quem vai convosco.', reference: 'Deuteronômio 31:6' },
  { id: 17, text: 'O coração do homem planeja o seu caminho, mas o Senhor lhe dirige os passos.', reference: 'Provérbios 16:9' },
  { id: 18, text: 'O Senhor é bom, uma fortaleza no dia da angústia; conhece os que confiam nele.', reference: 'Naum 1:7' },
  { id: 19, text: 'Cria em mim, ó Deus, um coração puro, e renova dentro de mim um espírito reto.', reference: 'Salmos 51:10' },
  { id: 20, text: 'O amor é paciente, o amor é bondoso; não inveja, não se vangloria, não se orgulha.', reference: '1 Coríntios 13:4' },
  { id: 21, text: 'Guardarei a tua palavra no meu coração para não pecar contra ti.', reference: 'Salmos 119:11' },
  { id: 22, text: 'O Senhor te abençoe e te guarde; faça resplandecer o seu rosto sobre ti, e tenha misericórdia de ti.', reference: 'Números 6:24-25' },
  { id: 22, text: 'A resposta branda desvia o furor, mas a palavra dura suscita a ira.', reference: 'Provérbios 15:1' },
  { id: 23, text: 'Em tudo dai graças, porque esta é a vontade de Deus em Cristo Jesus para convosco.', reference: '1 Tessalonicenses 5:18' },
  { id: 24, text: 'Não andeis ansiosos por coisa alguma; antes, em tudo sejam os vossos pedidos conhecidos diante de Deus pela oração e súplica com ação de graças.', reference: 'Filipenses 4:6' },
  { id: 25, text: 'Aquele que habita no esconderijo do Altíssimo, à sombra do Onipotente descansará.', reference: 'Salmos 91:1' },
  { id: 26, text: 'O Senhor pelejará por vós, e vós vos calareis.', reference: 'Êxodo 14:14' },
  { id: 27, text: 'Bem-aventurados os que confiam no Senhor e cuja confiança é o Senhor.', reference: 'Jeremias 17:7' },
  { id: 26, text: 'A fé é a certeza daquilo que esperamos e a prova das coisas que não vemos.', reference: 'Hebreus 11:1' },
  { id: 28, text: 'O Senhor é misericordioso e compassivo, longânimo e grande em benignidade.', reference: 'Salmos 103:8' },
  { id: 29, text: 'Porque sou eu que conheço os planos que tenho para vós, diz o Senhor, planos de bem e não de mal, para vos dar o futuro e a esperança.', reference: 'Jeremias 29:11' },
  { id: 27, text: 'Vinde a mim, todos os que estais cansados e oprimidos, e eu vos aliviarei.', reference: 'Mateus 11:28' },
  { id: 30, text: 'O Senhor é justo em todos os seus caminhos e bondoso em todas as suas obras.', reference: 'Salmos 145:17' },
  { id: 31, text: 'O Senhor é o meu rochedo, a minha fortaleza e o meu libertador.', reference: 'Salmos 18:2' },
  { id: 28, text: 'Eu vos dou um novo mandamento: que vos ameis uns aos outros; como eu vos amei.', reference: 'João 13:34' },
  { id: 29, text: 'E conhecereis a verdade, e a verdade vos libertará.', reference: 'João 8:32' },
  { id: 30, text: 'Não temas, porque eu te remi; chamei-te pelo teu nome; tu és meu.', reference: 'Isaías 43:1' },
  { id: 32, text: 'O Senhor é a minha força e o meu cântico; ele se tornou a minha salvação.', reference: 'Êxodo 15:2' },
  { id: 33, text: 'Sonda-me, ó Deus, e conhece o meu coração; prova-me e conhece os meus pensamentos.', reference: 'Salmos 139:23' },
  { id: 34, text: 'Cantai ao Senhor um cântico novo; cantai ao Senhor, todas as terras.', reference: 'Salmos 96:1' },
  { id: 35, text: 'Confia no Senhor perpetuamente, porque o Senhor Deus é uma rocha eterna.', reference: 'Isaías 26:4' },
  { id: 36, text: 'Louvai ao Senhor, porque ele é bom; porque a sua benignidade dura para sempre.', reference: 'Salmos 136:1' },
  { id: 31, text: 'O Senhor sustenta todos os que caem e levanta todos os abatidos.', reference: 'Salmos 145:14' },
  { id: 32, text: 'Mas os que esperam no Senhor renovarão as suas forças; subirão com asas como águias.', reference: 'Isaías 40:31' },
  { id: 37, text: 'Clama ao Senhor, e ele te ouvirá, e todos os teus inimigos serão envergonhados.', reference: 'Salmos 34:17' },
  { id: 38, text: 'O Senhor é o meu refúgio e a minha fortaleza, meu Deus, em quem confio.', reference: 'Salmos 91:2' },
  { id: 33, text: 'Alegrai-vos sempre no Senhor; outra vez digo: alegrai-vos.', reference: 'Filipenses 4:4' },
  { id: 34, text: 'Esforça-te, e tem bom ânimo; não temas, nem te espantes, porque o Senhor teu Deus é contigo.', reference: 'Josué 1:9' },
  { id: 39, text: 'O Senhor é bom para todos, e as suas misericórdias estão sobre todas as suas obras.', reference: 'Salmos 145:9' },
  { id: 40, text: 'Honra ao Senhor com os teus bens, e com as primícias de toda a tua renda.', reference: 'Provérbios 3:9' },
  { id: 41, text: 'Guardai-vos de fazer as vossas obras de justiça diante dos homens.', reference: 'Mateus 6:1' },
  { id: 35, text: 'Pedi, e dar-se-vos-á; buscai, e encontrareis; batei, e abrir-se-vos-á.', reference: 'Mateus 7:7' },
  { id: 42, text: 'Eis que estou à porta e bato; se alguém ouvir a minha voz e abrir a porta, entrarei em sua casa.', reference: 'Apocalipse 3:20' },
  { id: 36, text: 'Vós sois a luz do mundo; não se pode esconder uma cidade edificada sobre um monte.', reference: 'Mateus 5:14' },
  { id: 43, text: 'Assim resplandeça a vossa luz diante dos homens.', reference: 'Mateus 5:16' },
  { id: 37, text: 'Em paz também me deitarei e dormirei, porque só tu, Senhor, me fazes habitar em segurança.', reference: 'Salmos 4:8' },
  { id: 44, text: 'Guardará em perfeita paz aquele cujo propósito está firme, porque em ti confia.', reference: 'Isaías 26:3' },
  { id: 45, text: 'O fruto do Espírito é: amor, alegria, paz, longanimidade, benignidade, bondade, fidelidade.', reference: 'Gálatas 5:22' },
  { id: 38, text: 'Grandes coisas fez o Senhor por nós, pelas quais estamos alegres.', reference: 'Salmos 126:3' },
  { id: 46, text: 'Seja a vossa moderação conhecida de todos os homens. Perto está o Senhor.', reference: 'Filipenses 4:5' },
  { id: 39, text: 'Sede bondosos uns para com os outros, compassivos, perdoando-vos uns aos outros.', reference: 'Efésios 4:32' },
  { id: 47, text: 'O Senhor é a porção da minha herança e do meu cálice; tu tu sustentas a minha sorte.', reference: 'Salmos 16:5' },
  { id: 48, text: 'Tenho posto o Senhor continuamente diante de mim; por isso que ele está à minha direita, não serei abalado.', reference: 'Salmos 16:8' },
  { id: 49, text: 'Mostrar-me-ás a vereda da vida; na tua presença há fartura de alegrias.', reference: 'Salmos 16:11' },
  { id: 50, text: 'Instrui o menino no caminho em que deve andar, e até quando envelhecer não se desviará dele.', reference: 'Provérbios 22:6' },
  { id: 51, text: 'Como é bom e quão suave é que os irmãos vivam em união.', reference: 'Salmos 133:1' },
  { id: 52, text: 'Porque onde estiverem dois ou três reunidos em meu nome, aí estou eu no meio deles.', reference: 'Mateus 18:20' },
  { id: 40, text: 'O Senhor te guardará de todo o mal; ele guardará a tua alma.', reference: 'Salmos 121:7' },
  { id: 41, text: 'O Senhor guardará a tua saída e a tua entrada, desde agora e para sempre.', reference: 'Salmos 121:8' },
  { id: 42, text: 'Bendize, ó minha alma, ao Senhor, e tudo o que há em mim bendiga o seu santo nome.', reference: 'Salmos 103:1' },
].map((verse, index) => ({ ...verse, id: index + 1 }));

const readList = (key: string): number[] => {
  try {
    const data: unknown = JSON.parse(localStorage.getItem(key) ?? '[]');
    return Array.isArray(data) ? data.filter((id): id is number => Number.isInteger(id) && verses.some(v => v.id === id)) : [];
  } catch { return []; }
};
const todayVerse = () => verses[Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000) % verses.length]!;
const dateLabel = new Intl.DateTimeFormat('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' });

function App() {
  const [tab, setTab] = useState<Tab>('today');
  const [selected, setSelected] = useState<Verse>(todayVerse);
  const [favoriteIds, setFavoriteIds] = useState(readList('meuverso-favorites-v1'));
  const [theme, setTheme] = useState(() => localStorage.getItem('meuverso-theme') ?? 'system');
  const [style, setStyle] = useState(() => Number(localStorage.getItem('meuverso-card-style') ?? 0) || 0);
  const [query, setQuery] = useState('');
  const [toast, setToast] = useState('');
  const [error, setError] = useState('');
  const pwa = usePwa();
  useEffect(() => { try { document.documentElement.dataset.theme = theme; localStorage.setItem('meuverso-theme', theme); } catch { setError('Não foi possível guardar o tema neste dispositivo.'); } }, [theme]);
  useEffect(() => { try { localStorage.setItem('meuverso-favorites-v1', JSON.stringify(favoriteIds)); } catch { setError('Não foi possível guardar os favoritos. Verifique o espaço disponível no navegador.'); } }, [favoriteIds]);
  useEffect(() => { try { localStorage.setItem('meuverso-card-style', String(style)); } catch { /* Style preference is optional. */ } }, [style]);
  useEffect(() => { if (!toast) return; const id = window.setTimeout(() => setToast(''), 2600); return () => clearTimeout(id); }, [toast]);

  const favorite = favoriteIds.includes(selected.id);
  const filtered = useMemo(() => verses.filter(v => `${v.text} ${v.reference}`.toLocaleLowerCase('pt-BR').includes(query.toLocaleLowerCase('pt-BR'))), [query]);
  const favorites = verses.filter(v => favoriteIds.includes(v.id));
  const notify = (message: string) => { setToast(message); setError(''); };
  const toggleFavorite = (verse: Verse) => setFavoriteIds(ids => ids.includes(verse.id) ? ids.filter(id => id !== verse.id) : [...ids, verse.id]);
  const chooseVerse = (verse: Verse) => { setSelected(verse); setTab('today'); window.scrollTo({ top: 0, behavior: 'smooth' }); };
  const cardColors = ['#596459', 'linear-gradient(145deg,#c38e66,#825743)', 'linear-gradient(145deg,#7c8498,#485066)', 'linear-gradient(145deg,#77988c,#46695e)', 'linear-gradient(145deg,#e6d8ba,#c1a979)'];
  const cardText = style === 4 ? '#322d24' : '#fffaf1';

  const exportCard = async () => {
    try {
      const canvas = document.createElement('canvas'); canvas.width = 1100; canvas.height = 1300;
      const ctx = canvas.getContext('2d'); if (!ctx) throw new Error('Canvas indisponível.');
      const gradient = ctx.createLinearGradient(0, 0, 1100, 1300);
      if (style === 0) gradient.addColorStop(0, '#758073'); else if (style === 1) { gradient.addColorStop(0, '#c38e66'); gradient.addColorStop(1, '#825743'); } else if (style === 2) { gradient.addColorStop(0, '#7c8498'); gradient.addColorStop(1, '#485066'); } else if (style === 3) { gradient.addColorStop(0, '#77988c'); gradient.addColorStop(1, '#46695e'); } else { gradient.addColorStop(0, '#e6d8ba'); gradient.addColorStop(1, '#c1a979'); }
      ctx.fillStyle = gradient; ctx.fillRect(0, 0, 1100, 1300);
      ctx.fillStyle = cardText; ctx.textAlign = 'center';
      ctx.font = '32px Georgia'; ctx.fillText('MEUVERSO  ·  UM VERSO PARA HOJE', 550, 190);
      ctx.font = 'italic 52px Georgia';
      const words = selected.text.split(' '); let line = '', y = 540;
      for (const word of words) { const next = `${line}${word} `; if (ctx.measureText(next).width > 850 && line) { ctx.fillText(line.trim(), 550, y); line = `${word} `; y += 78; } else line = next; }
      ctx.fillText(line.trim(), 550, y);
      ctx.font = '32px Georgia'; ctx.fillText(selected.reference, 550, y + 120);
      const blob = await new Promise<Blob>((resolve, reject) => canvas.toBlob(b => b ? resolve(b) : reject(new Error('Falha ao criar imagem.')), 'image/png'));
      const file = new File([blob], 'meuverso.png', { type: 'image/png' });
      if (navigator.share && navigator.canShare?.({ files: [file] })) { await navigator.share({ files: [file], title: selected.reference, text: selected.text }); return; }
      const url = URL.createObjectURL(blob); const link = document.createElement('a'); link.href = url; link.download = 'meuverso.png'; link.click(); URL.revokeObjectURL(url); notify('Imagem salva no dispositivo.');
    } catch (e) { if (e instanceof Error && e.name === 'AbortError') return; setError(e instanceof Error ? e.message : 'Não foi possível compartilhar este verso.'); }
  };

  const navigation: { id: Tab; label: string; icon: typeof House }[] = [
    { id: 'today', label: 'Hoje', icon: House }, { id: 'explore', label: 'Explorar', icon: Search },
    { id: 'saved', label: 'Favoritos', icon: Heart }, { id: 'settings', label: 'Ajustes', icon: Settings },
  ];
  return <div className="app-shell">
    <aside className="sidebar"><a className="brand" href="#" onClick={e => { e.preventDefault(); setTab('today'); }}><span className="brand-icon"><BookOpen size={21}/></span><span>meu<span className="brand-bold">verso</span><small>um respiro para a alma</small></span></a><nav aria-label="Navegação principal">{navigation.map(({ id, label, icon: Icon }) => <button key={id} className={`nav-item ${tab === id ? 'active' : ''}`} onClick={() => setTab(id)}><Icon size={18}/>{label}{id === 'saved' && favorites.length > 0 && <span className="nav-count">{favorites.length}</span>}</button>)}</nav><div className="sidebar-bottom"><p>Palavras que acolhem,<br/>todos os dias.</p><div className="online-dot"><i className={!pwa.online ? 'offline' : ''}/>{pwa.online ? 'Você está online' : 'Modo offline'}</div></div></aside>
    <main className="main-area">
      <header className="topbar"><div className="breadcrumb">Meu espaço <ChevronRight size={14}/><span>{navigation.find(item => item.id === tab)?.label}</span></div><div className="top-actions"><span className="date">{dateLabel.format(new Date())}</span><button className="icon-button" aria-label={theme === 'dark' ? 'Usar tema claro' : 'Usar tema escuro'} onClick={() => setTheme(theme === 'dark' ? 'light' : theme === 'light' ? 'dark' : matchMedia('(prefers-color-scheme: dark)').matches ? 'light' : 'dark')}>{theme === 'dark' ? <Sun size={18}/> : <Moon size={18}/>}</button></div></header>
      <div className="content">
        {tab === 'today' && <><section className="welcome"><div className="eyebrow"><Sparkles size={14}/> UM MOMENTO PARA VOCÊ</div><h1>Palavras que <em>fazem bem.</em></h1><p>Um instante de calma para acompanhar o seu dia.</p></section>
          <section className="verse-layout"><article className={`verse-card style-${style}`} style={{ background: cardColors[style], color: cardText }} aria-label={`Verso: ${selected.reference}`}><div className="card-ornament">“</div><div className="verse-label">VERSO {selected.id === todayVerse().id ? 'DO DIA' : 'ESCOLHIDO'}</div><blockquote>{selected.text}</blockquote><div className="verse-divider"/><div className="verse-reference">{selected.reference}</div><div className="card-watermark">meuverso</div></article>
            <div className="card-actions"><button className={`action-button ${favorite ? 'is-favorite' : ''}`} onClick={() => toggleFavorite(selected)}><Heart size={17} fill={favorite ? 'currentColor' : 'none'}/>{favorite ? 'Salvo nos favoritos' : 'Salvar favorito'}</button><button className="action-button" onClick={() => void exportCard()}><Share2 size={17}/>Compartilhar</button><button className="action-button" onClick={() => void exportCard()}><Download size={17}/>Baixar imagem</button></div>
            <div className="card-theme"><Palette size={16}/><span>Estilo do cartão</span><div className="swatches" role="group" aria-label="Escolher estilo do cartão">{cardColors.map((color, i) => <button aria-label={`Estilo ${i + 1}`} aria-pressed={style === i} key={i} onClick={() => setStyle(i)} style={{ background: color }} className={style === i ? 'swatch selected' : 'swatch'}/>)}</div></div>
            <div className="verse-switcher"><button className="subtle-button" onClick={() => chooseVerse(verses[(verses.indexOf(selected) - 1 + verses.length) % verses.length]!)}><ChevronLeft size={16}/> Anterior</button><button className="subtle-button" onClick={() => chooseVerse(verses[(verses.indexOf(selected) + 1) % verses.length]!)}>Próximo <ChevronRight size={16}/></button></div>
          </section><section className="privacy-note"><span className="privacy-icon"><BookOpen size={17}/></span><div><strong>Seu espaço, do seu jeito.</strong><p>Favoritos ficam neste dispositivo. Sem cadastro, conta ou sincronização.</p></div></section></>}

        {tab === 'explore' && <section className="page-section"><div className="eyebrow"><Search size={15}/> ACERVO LOCAL</div><h1>Encontre uma <em>palavra.</em></h1><p className="page-lead">Explore os versos disponíveis, mesmo sem internet.</p><label className="search-box"><Search size={18}/><input aria-label="Buscar verso ou referência" value={query} onChange={e => setQuery(e.target.value)} placeholder="Buscar um verso ou passagem..."/>{query && <button aria-label="Limpar busca" onClick={() => setQuery('')}>×</button>}</label><div className="results-label">{filtered.length} {filtered.length === 1 ? 'verso encontrado' : 'versos encontrados'}</div>{filtered.length ? <div className="verse-list">{filtered.map(v => <VerseRow key={v.id} verse={v} isFavorite={favoriteIds.includes(v.id)} onOpen={() => chooseVerse(v)} onFavorite={() => toggleFavorite(v)} />)}</div> : <EmptyState title="Nenhum verso encontrado" detail="Tente outra palavra, um nome de livro ou a referência."/>}</section>}

        {tab === 'saved' && <section className="page-section"><div className="eyebrow"><Heart size={15}/> SEUS VERSOS</div><h1>Guardados com <em>carinho.</em></h1><p className="page-lead">Suas palavras favoritas, disponíveis neste dispositivo.</p>{favorites.length ? <div className="verse-list">{favorites.map(v => <VerseRow key={v.id} verse={v} isFavorite onOpen={() => chooseVerse(v)} onFavorite={() => toggleFavorite(v)} />)}</div> : <EmptyState title="Seus favoritos começam aqui" detail="Toque no coração de um verso para guardá-lo. Ele ficará disponível por aqui, mesmo offline."/>}</section>}

        {tab === 'settings' && <section className="page-section"><div className="eyebrow"><Settings size={15}/> SEU MEUVERSO</div><h1>Um espaço com <em>a sua cara.</em></h1><p className="page-lead">Preferências e informações para usar o MeuVerso.</p><div className="settings-card"><h2>Aparência</h2><p>Escolha como o app aparece no seu dispositivo.</p><div className="theme-options">{(['system','light','dark'] as const).map(value => <button key={value} aria-pressed={theme === value} onClick={() => setTheme(value)} className={theme === value ? 'theme-option chosen' : 'theme-option'}>{value === 'system' ? <CircleHelp size={18}/> : value === 'light' ? <Sun size={18}/> : <Moon size={18}/>}<span>{value === 'system' ? 'Sistema' : value === 'light' ? 'Claro' : 'Escuro'}</span>{theme === value && <Check size={16}/>}</button>)}</div></div>
          <div className="settings-card"><h2>Instale no seu dispositivo</h2><p>Adicione o MeuVerso à tela inicial para abri-lo como um app.</p><div className="install-instructions"><div><span className="step-number">1</span><p><strong>iPhone ou iPad</strong><br/>Abra no Safari, toque em <strong>Compartilhar</strong> e escolha <strong>Adicionar à Tela de Início</strong>.</p></div><div><span className="step-number">2</span><p><strong>Android</strong><br/>Abra no navegador e escolha <strong>Instalar app</strong> ou <strong>Adicionar à tela inicial</strong> no menu.</p></div></div>{pwa.updateAvailable && <button className="primary-button update-button" onClick={pwa.applyUpdate}>Atualizar o app</button>}{pwa.offlineReady && <div className="ready-hint"><Check size={15}/> Este app já pode abrir sem internet.</div>}</div>
          <div className="settings-card"><h2>Como seus dados funcionam</h2><p>Seus favoritos e preferências ficam salvos localmente neste navegador. O app não usa conta, servidor nem sincronização na nuvem. Os versos e a interface ficam disponíveis offline depois do primeiro carregamento. Se você apagar os dados do navegador, os favoritos serão removidos.</p></div>
          <div className="settings-card"><h2>O que este app oferece</h2><p>Este app foi inspirado no projeto MeuVerso para Android. Traz versos diários, favoritos e cartões para compartilhar. Notificações programadas e publicações em redes sociais não fazem parte desta versão web.</p></div>
        </section>}
        {(error || pwa.error) && <div className="error-message" role="alert">{error || pwa.error}</div>}
        {toast && <div className="toast-message" role="status"><Check size={15}/>{toast}</div>}
      </div>
    </main>
    <nav className="mobile-nav" aria-label="Navegação principal">{navigation.map(({ id, label, icon: Icon }) => <button key={id} aria-current={tab === id ? 'page' : undefined} className={tab === id ? 'mobile-item active' : 'mobile-item'} onClick={() => setTab(id)}><Icon size={19}/><span>{label}</span></button>)}</nav>
  </div>;
}

function VerseRow({ verse, isFavorite, onOpen, onFavorite }: { verse: Verse; isFavorite: boolean; onOpen: () => void; onFavorite: () => void }) {
  return <article className="verse-row"><button className="verse-row-open" onClick={onOpen}><span className="verse-row-ref">{verse.reference}</span><span className="verse-row-text">{verse.text}</span><span className="verse-row-more">Ver verso <ChevronRight size={15}/></span></button><button aria-label={isFavorite ? `Remover ${verse.reference} dos favoritos` : `Adicionar ${verse.reference} aos favoritos`} className={`row-heart ${isFavorite ? 'is-favorite' : ''}`} onClick={onFavorite}><Heart size={17} fill={isFavorite ? 'currentColor' : 'none'}/></button></article>;
}
function EmptyState({ title, detail }: { title: string; detail: string }) {
  return <div className="empty-state"><div className="empty-icon"><Heart size={23}/></div><h2>{title}</h2><p>{detail}</p></div>;
}

export default App;
