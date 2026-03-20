/* ============================================
   NIKA — CHATBOT
   File separato da includere in ogni pagina
   ============================================ */

// ── INIT ──
document.addEventListener('DOMContentLoaded', function() {
(function() {

  // Inserisce HTML del chatbot nel body
  var chatHTML = `
<!-- CHATBOT -->
<div id="chat-bubble" onclick="toggleChat()" title="Chatta con me">
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M12 2a3 3 0 0 1 3 3v6H9V5a3 3 0 0 1 3-3z"/><circle cx="9" cy="16" r="1" fill="currentColor"/><circle cx="15" cy="16" r="1" fill="currentColor"/><path d="M8 11V7"/><path d="M16 11V7"/></svg>
  <span id="chat-notif">1</span>
</div>

<div id="chat-window">
  <div id="chat-header">
    <div id="chat-avatar">N</div>
    <div>
      <div id="chat-name">Nika Digital</div>
      <div id="chat-status">● Online — rispondo subito</div>
    </div>
    <button id="chat-close" onclick="toggleChat()">✕</button>
  </div>
  <div id="chat-messages"></div>
  <div id="chat-options"></div>
</div>`;

  // Inserisce CSS del chatbot
  var chatCSS = `
<style id="chatbot-styles">
#chat-bubble {
  position: fixed; bottom: 30px; right: 92px;
  width: 52px; height: 52px;
  background: var(--verde); color: var(--beige);
  border-radius: 50%; display: flex; align-items: center; justify-content: center;
  cursor: pointer; z-index: 1001;
  box-shadow: 0 8px 30px rgba(54,71,52,0.35);
  transition: transform 0.3s ease, box-shadow 0.3s ease, opacity 0.3s ease;
}
#chat-bubble:hover { transform: scale(1.08); box-shadow: 0 12px 40px rgba(54,71,52,0.45); }
#chat-notif {
  position: absolute; top: -4px; right: -4px;
  width: 18px; height: 18px;
  background: #b94040; color: #fff;
  border-radius: 50%; font-size: 10px; font-weight: 700;
  display: flex; align-items: center; justify-content: center;
  font-family: 'Montserrat', sans-serif;
}
#chat-window {
  position: fixed; bottom: 96px; right: 32px;
  width: 320px; max-height: 420px;
  background: var(--beige-light);
  border-radius: 20px;
  box-shadow: 0 20px 60px rgba(54,71,52,0.22);
  display: none; flex-direction: column;
  z-index: 1001; overflow: hidden;
  font-family: 'Montserrat', sans-serif;
}
#chat-window.open { display: flex; }
#chat-header {
  background: var(--verde); color: var(--beige);
  padding: 14px 18px; display: flex; align-items: center; gap: 12px;
  flex-shrink: 0;
}
#chat-avatar {
  width: 36px; height: 36px; border-radius: 50%;
  background: rgba(234,227,210,0.18);
  display: flex; align-items: center; justify-content: center;
  font-family: 'Playfair Display', serif; font-size: 15px; font-style: italic;
  color: var(--beige); flex-shrink: 0;
}
#chat-name { font-size: 13px; font-weight: 600; letter-spacing: 0.3px; }
#chat-status { font-size: 10px; opacity: 0.6; letter-spacing: 0.5px; margin-top: 2px; }
#chat-close {
  margin-left: auto; background: none; border: none;
  color: var(--beige); opacity: 0.75; cursor: pointer;
  font-size: 20px; line-height: 1; padding: 4px 8px;
  transition: opacity 0.2s; font-family: 'Montserrat', sans-serif;
  z-index: 10; position: relative;
}
#chat-close:hover { opacity: 1; }
#chat-messages {
  flex: 1; overflow-y: auto; padding: 14px 14px 8px;
  display: flex; flex-direction: column; gap: 8px;
  scroll-behavior: smooth; min-height: 120px;
}
#chat-messages::-webkit-scrollbar { width: 3px; }
#chat-messages::-webkit-scrollbar-thumb { background: var(--beige-dark); border-radius: 2px; }
.msg {
  max-width: 84%; padding: 10px 14px;
  border-radius: 16px; font-size: 12.5px; line-height: 1.6;
  animation: msgIn 0.28s ease;
}
.msg-typing {
  display: flex; align-items: center; gap: 5px;
  padding: 12px 16px; min-width: 56px;
}
.typing-dot {
  width: 7px; height: 7px; border-radius: 50%;
  background: var(--verde); opacity: 0.35;
  animation: typingBounce 1.2s ease-in-out infinite;
  display: inline-block;
}
.typing-dot:nth-child(2) { animation-delay: 0.2s; }
.typing-dot:nth-child(3) { animation-delay: 0.4s; }
@keyframes typingBounce {
  0%, 60%, 100% { transform: translateY(0); opacity: 0.35; }
  30% { transform: translateY(-5px); opacity: 0.9; }
}
@keyframes msgIn { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }
@keyframes btnIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
.msg-bot {
  background: var(--beige); color: var(--verde);
  border-bottom-left-radius: 4px; align-self: flex-start;
}
.msg-user {
  background: var(--verde); color: var(--beige);
  border-bottom-right-radius: 4px; align-self: flex-end;
  font-weight: 500;
}
#chat-options {
  padding: 10px 14px 14px; border-top: 1px solid rgba(54,71,52,0.08);
  display: flex; flex-direction: column; gap: 6px;
  max-height: 210px; overflow-y: auto; flex-shrink: 0;
}
#chat-options::-webkit-scrollbar { width: 3px; }
#chat-options::-webkit-scrollbar-thumb { background: var(--beige-dark); border-radius: 2px; }
.c-btn {
  background: var(--beige); border: 1.5px solid rgba(54,71,52,0.13);
  border-radius: 50px; padding: 8px 16px;
  font-family: 'Montserrat', sans-serif; font-size: 12px;
  color: var(--verde); cursor: pointer; text-align: left;
  transition: all 0.2s ease; font-weight: 500; width: 100%;
  animation: btnIn 0.4s ease forwards;
}
.c-btn:hover { background: var(--verde); color: var(--beige); border-color: var(--verde); }
.c-btn-link {
  background: rgba(54,71,52,0.07); border: 1.5px solid rgba(54,71,52,0.2);
  border-radius: 50px; padding: 8px 16px;
  font-family: 'Montserrat', sans-serif; font-size: 11.5px;
  color: var(--verde); cursor: pointer; text-align: center;
  transition: all 0.2s ease; font-weight: 600; width: 100%;
  text-decoration: none; display: block; letter-spacing: 0.3px;
  animation: btnIn 0.4s ease forwards;
}
.c-btn-link:hover { background: var(--verde); color: var(--beige); border-color: var(--verde); }
.c-btn-menu {
  background: none; border: none; color: var(--verde);
  opacity: 0.45; font-size: 11px; font-family: 'Montserrat', sans-serif;
  cursor: pointer; padding: 2px 0; letter-spacing: 0.5px;
  transition: opacity 0.2s; align-self: center; width: auto;
  animation: btnIn 0.4s ease forwards;
}
.c-btn-menu:hover { opacity: 0.85; }
#chat-close, #chat-bubble, .c-btn, .c-btn-link, .c-btn-menu { cursor: pointer !important; }
@media (max-width: 768px) {
  #chat-bubble { bottom: 18px; right: 78px; width: 46px; height: 46px; }
  #chat-window { right: 8px; left: 8px; width: auto; bottom: 78px; max-height: 65vh; }
}
@media (max-width: 480px) {
  #chat-bubble { bottom: 18px; right: 74px; width: 46px; height: 46px; }
  #chat-window { right: 8px; left: 8px; bottom: 74px; max-height: 60vh; }
}
</style>`;

  // Inietta HTML e CSS nel body
  document.body.insertAdjacentHTML('beforeend', chatCSS + chatHTML);

  // ── VARIABILI ──
  var chatOpen = false;
  var msgEl = document.getElementById('chat-messages');
  var optEl = document.getElementById('chat-options');

  // ── ALBERO CONVERSAZIONE ──
  var tree = {
    main: {
      bot: 'Ciao! 👋 Sono l\'assistente virtuale di Nika Digital. Come posso aiutarti oggi?',
      opts: [
        { label: '🙋 Chi è Nika?', next: 'chi' },
        { label: '✨ Servizi offerti', next: 'servizi' },
        { label: '🚀 Come iniziare', next: 'iniziare' },
        { label: '📬 Contatti', next: 'contatti' }
      ]
    },
    chi: {
      bot: 'Nika è una Social Media Manager & Content Strategist. Crea strategie digitali su misura integrando creatività, dati e intelligenza artificiale per far crescere brand che vogliono lasciare il segno.',
      opts: [
        { label: '📚 La sua formazione', next: 'formazione' },
        { label: '🖼 Il suo portfolio', next: 'portfolio', link: 'chi-sono.html' },
        { label: '↩ Torna al menu', next: 'main' }
      ]
    },
    formazione: {
      bot: 'Nika ha un background in commercio estero e fitness coaching, con una passione sempre viva per i contenuti digitali. Ha poi completato corsi specializzati in Digital Marketing, Content Strategy con AI e Web Creation.',
      opts: [
        { label: '✨ Vedi i servizi', next: 'servizi' },
        { label: '↩ Menu principale', next: 'main' }
      ]
    },
    portfolio: {
      bot: 'Nel portfolio trovi esempi di contenuti visivi, reel, grafiche e strategie realizzate per clienti reali. Puoi anche seguirla su Instagram @nikadigital.hub!',
      opts: [
        { label: '→ Vai alla pagina Chi Sono', next: null, link: 'chi-sono.html' },
        { label: '↩ Menu principale', next: 'main' }
      ]
    },
    servizi: {
      bot: 'Nika offre quattro aree di specializzazione. Quale ti interessa approfondire?',
      opts: [
        { label: '📱 Social Media Management', next: 'smm' },
        { label: '📋 Content Strategy', next: 'strategy' },
        { label: '🎬 Video & Visual Design', next: 'visual' },
        { label: '🤖 AI Powered Solutions', next: 'ai' },
        { label: '↩ Menu principale', next: 'main' }
      ]
    },
    smm: {
      bot: 'Gestione totale e strategica dei tuoi canali social: calendario editoriale, creazione contenuti, community management e report mensili con analisi delle performance.',
      opts: [
        { label: '→ Scopri tutti i servizi', next: null, link: 'servizi.html' },
        { label: '↩ Torna ai servizi', next: 'servizi' },
        { label: '↩ Menu principale', next: 'main' }
      ]
    },
    strategy: {
      bot: 'Definizione di obiettivi, tone of voice, pillar editoriali e un piano d\'azione narrativo. Ogni contenuto ha uno scopo preciso, misurato con dati reali.',
      opts: [
        { label: '→ Scopri tutti i servizi', next: null, link: 'servizi.html' },
        { label: '↩ Torna ai servizi', next: 'servizi' },
        { label: '↩ Menu principale', next: 'main' }
      ]
    },
    visual: {
      bot: 'Grafiche, reel e video su misura per il tuo brand. Contenuti visivi che catturano l\'attenzione, raccontano la tua identità e convertono.',
      opts: [
        { label: '→ Scopri tutti i servizi', next: null, link: 'servizi.html' },
        { label: '↩ Torna ai servizi', next: 'servizi' },
        { label: '↩ Menu principale', next: 'main' }
      ]
    },
    ai: {
      bot: 'Nika integra l\'intelligenza artificiale nel suo metodo: automazione, generazione contenuti, analisi predittiva dei trend. Più output, più risultati — zero qualità sacrificata.',
      opts: [
        { label: '→ Scopri tutti i servizi', next: null, link: 'servizi.html' },
        { label: '↩ Torna ai servizi', next: 'servizi' },
        { label: '↩ Menu principale', next: 'main' }
      ]
    },
    iniziare: {
      bot: 'Iniziare è semplice! Il primo passo è una call conoscitiva gratuita di 30 minuti in cui si esplorano le tue esigenze, gli obiettivi e la visione del tuo brand.',
      opts: [
        { label: '📅 Prenota la call gratuita', next: null, link: 'contatti.html' },
        { label: '💬 Scrivile su WhatsApp', next: null, link: 'https://wa.me/393318461681' },
        { label: '💰 Quanto costa?', next: 'costi' },
        { label: '↩ Menu principale', next: 'main' }
      ]
    },
    costi: {
      bot: 'Non esistono pacchetti standard: ogni progetto è unico. La proposta viene costruita dopo la call conoscitiva gratuita, in base alle tue reali esigenze e al tuo budget.',
      opts: [
        { label: '📅 Prenota la call gratuita', next: null, link: 'contatti.html' },
        { label: '↩ Menu principale', next: 'main' }
      ]
    },
    contatti: {
      bot: 'Puoi contattare Nika nei seguenti modi. Risponde sempre entro 24 ore con idee concrete! 🌿',
      opts: [
        { label: '✉️ Form di contatto', next: null, link: 'contatti.html' },
        { label: '💬 WhatsApp', next: null, link: 'https://wa.me/393318461681' },
        { label: '📸 Instagram', next: null, link: 'https://www.instagram.com/nikadigital.hub/' },
        { label: '💼 LinkedIn', next: null, link: 'https://www.linkedin.com/in/nicolemarradigital/' },
        { label: '↩ Menu principale', next: 'main' }
      ]
    }
  };

  // ── FUNZIONI ──
  window.toggleChat = function() {
    chatOpen = !chatOpen;
    var win = document.getElementById('chat-window');
    if (chatOpen) {
      win.classList.add('open');
      document.getElementById('chat-notif').style.display = 'none';
      if (msgEl.children.length === 0) goTo('main', null);
    } else {
      win.classList.remove('open');
    }
  };

  function addMsg(type, text) {
    var d = document.createElement('div');
    d.className = 'msg msg-' + type;
    msgEl.appendChild(d);
    if (type === 'user') {
      d.textContent = text;
    } else {
      var i = 0, speed = 25;
      function typeWriter() {
        if (i < text.length) {
          d.textContent += text.charAt(i);
          i++;
          setTimeout(typeWriter, speed);
          msgEl.scrollTop = msgEl.scrollHeight;
        }
      }
      typeWriter();
    }
    msgEl.scrollTop = msgEl.scrollHeight;
  }

  function addTyping() {
    var d = document.createElement('div');
    d.className = 'msg msg-bot msg-typing';
    d.id = 'typing-indicator';
    d.innerHTML = '<span class="typing-dot"></span><span class="typing-dot"></span><span class="typing-dot"></span>';
    msgEl.appendChild(d);
    msgEl.scrollTop = msgEl.scrollHeight;
  }

  function removeTyping() {
    var t = document.getElementById('typing-indicator');
    if (t) t.remove();
  }

  function goTo(nodeKey, userLabel) {
    if (userLabel) addMsg('user', userLabel);
    var node = tree[nodeKey];
    optEl.innerHTML = '';
    setTimeout(function() {
      addTyping();
      setTimeout(function() {
        removeTyping();
        var typingDuration = node.bot.length * 25;
        addMsg('bot', node.bot);
        setTimeout(function() {
          node.opts.forEach(function(opt, index) {
            var element;
            if (opt.link) {
              element = document.createElement('a');
              element.className = 'c-btn-link';
              element.href = opt.link;
              if (opt.link.startsWith('http')) element.target = '_blank';
            } else {
              element = document.createElement('button');
              element.className = opt.next === 'main' ? 'c-btn-menu' : 'c-btn';
              element.onclick = function() { goTo(opt.next, opt.label); };
            }
            element.textContent = opt.label;
            element.style.animationDelay = (index * 0.1) + 's';
            optEl.appendChild(element);
          });
        }, typingDuration + 200);
      }, 1200);
    }, 300);
  }

})();
}); // DOMContentLoaded
