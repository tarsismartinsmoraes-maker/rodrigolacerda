const toggle=document.querySelector('.menu-toggle');
const menu=document.querySelector('#menu');
function closeMenu(){toggle.setAttribute('aria-expanded','false');toggle.setAttribute('aria-label','Abrir menu');menu.classList.remove('open');}
toggle.addEventListener('click',()=>{const open=toggle.getAttribute('aria-expanded')!=='true';toggle.setAttribute('aria-expanded',String(open));toggle.setAttribute('aria-label',open?'Fechar menu':'Abrir menu');menu.classList.toggle('open',open);});
menu.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{closeMenu();menu.querySelectorAll('a').forEach(x=>x.classList.remove('active'));a.classList.add('active');}));
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeMenu();});

// Reveal cards once as they enter the viewport, with a short group stagger.
const motionPreference=window.matchMedia('(prefers-reduced-motion: reduce)');
const mobileMotion=window.matchMedia('(max-width: 760px), (pointer: coarse)').matches;
const animatedCards=[...document.querySelectorAll('.path-grid article, .gallery-grid figure')];
if(!motionPreference.matches && 'IntersectionObserver' in window){
  const cardObserver=new IntersectionObserver(entries=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){entry.target.classList.add('is-visible');cardObserver.unobserve(entry.target);}
    });
  },{threshold:mobileMotion?0.22:0.12,rootMargin:mobileMotion?'0px 0px -8% 0px':'0px'});
  animatedCards.forEach(card=>{
    const index=[...card.parentElement.children].indexOf(card);
    card.style.setProperty('--reveal-delay',`${mobileMotion?0:index*85}ms`);
    card.classList.add('reveal-card');
    cardObserver.observe(card);
  });
  motionPreference.addEventListener('change',event=>{
    if(event.matches){cardObserver.disconnect();animatedCards.forEach(card=>card.classList.add('is-visible'));}
  });
}
