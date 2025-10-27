
    // --- Small helpers for interactivity ---
    document.getElementById('year').textContent = new Date().getFullYear();

    // Intersection observer to reveal elements with .fade-in
    const io = new IntersectionObserver((entries)=>{
      entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('show');io.unobserve(e.target)}})
    },{threshold:0.12});
    document.querySelectorAll('.fade-in').forEach(el=>io.observe(el));

    // Contact form - using mailto fallback (no backend). It tries to open user's mail client.
    function handleContact(e){
      e.preventDefault();
      const name = e.target.name.value.trim();
      const email = e.target.email.value.trim();
      const message = e.target.message.value.trim();
      const status = document.getElementById('formStatus');

      if(!name || !email || !message){
        status.textContent = 'Please fill the form completely.';
        return false;
      }

      // Create mailto link
      const subject = encodeURIComponent('Portfolio contact from ' + name);
      const body = encodeURIComponent('Name: '+name+'\nEmail: '+email+'\n\n'+message);
      const mailto = `mailto:tanishaaamga@gmail.com?subject=${subject}&body=${body}`;

      // Try to open mail client
      window.location.href = mailto;
      status.textContent = 'Opening your email client...';
      return false;
    }

    // Small keyboard accessibility: allow Enter to open focused project link
    document.querySelectorAll('.project[tabindex]').forEach(card => {
      card.addEventListener('keydown', e=>{
        if(e.key === 'Enter'){
          const link = card.querySelector('a');
          if(link) link.click();
        }
      });
    });

    // Highlight nav on scroll
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('nav a');
    const navObserver = new IntersectionObserver((entries)=>{
      entries.forEach(entry=>{
        const id = entry.target.id;
        const link = document.querySelector(nav [href='#${id}']);
        if(entry.isIntersecting){
          navLinks.forEach(l=>l.style.opacity = '.6');
          if(link) link.style.opacity = '1';
        }
      });
    },{threshold:.35});
    sections.forEach(s=>navObserver.observe(s));

    // Small enhancement: preserve focus outlines only for keyboard users
    (function(){
      const handleFirstTab = (e) =>{
        if(e.key === 'Tab') document.documentElement.classList.add('user-is-tabbing');
      }
      window.addEventListener('keydown', handleFirstTab, {once:true});
    })();
  