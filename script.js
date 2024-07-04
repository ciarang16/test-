function replaceLoadingEl ( newEl ) {

  const loadingEl = document.getElementById('loading');
  loadingEl.remove();

  document.body.appendChild( newEl );

}

function handleInauthentic () {

  const inauthentic = document.createElement('h1');
  inauthentic.innerHTML = 'INAUTHENTIC. :(';
  document.body.classList = 'inauthentic';

  replaceLoadingEl( inauthentic );

};

function handleAuthentic () {

  const authentic = document.createElement('h1');
  authentic.innerHTML = 'AUTHENTIC! :D';
  document.body.classList = 'authentic';

  replaceLoadingEl( authentic );

};

function handleErr () {

  const err = document.createElement('h1');
  err.innerHTML = 'An unexpected error has occured, please try again later.';
  document.body.classList = 'inauthentic';

  replaceLoadingEl( err );

};

document.addEventListener("DOMContentLoaded", async () => {

  // Retreive URL parameters from tag
  const url = new URL( window.location );
  const tagId = parseInt( url.searchParams.get('tagId') );
  const eCode = url.searchParams.get('eCode');
  const enc = url.searchParams.get('enc');
  const cmac = url.searchParams.get('cmac');

  if ( tagId && eCode && enc && cmac ) {

    try {

      const res = await fetch('https://third-party.etrnl.app/v1/verifyTag', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'API-KEY': 'RNYY5BJUCDUUAUXIEXDD46WF1HAAQ8M2YMBECH9GONQ3LJDHJFOB03ZGN7789SPA' // Your API key goes here...
        },
        body: JSON.stringify({ tagId, eCode, enc, cmac })
      });
      const {
        success, // boolean
        exists, // boolean
        authentic, // boolean
        ctr, // number
        uid, // string (only provided if using the private key)
        err // error code
      } = await res.json();

      if ( authentic ) {

        handleAuthentic(); // Show authentic product page

      } else {

        handleInauthentic(); // Show inauthentic product page

      }

    } catch ( err ) {

      handleErr();

    }

  } else {

    console.error('Unable to retrieve tag data')
    handleInauthentic(); // This secure URL is inauthentic

  }

});
