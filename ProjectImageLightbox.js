(function () {
  var dialog = document.createElement('dialog');
  dialog.className = 'image-lightbox';
  dialog.setAttribute('aria-label', 'Image viewer');

  var closeButton = document.createElement('button');
  closeButton.className = 'image-lightbox-close';
  closeButton.type = 'button';
  closeButton.setAttribute('aria-label', 'Close enlarged image');
  closeButton.textContent = '\u00d7';

  var enlargedImage = document.createElement('img');
  dialog.appendChild(closeButton);
  dialog.appendChild(enlargedImage);
  document.body.appendChild(dialog);

  var activeImage = null;

  function closeLightbox() {
    if (dialog.open) {
      dialog.close();
    }
  }

  function openLightbox(image) {
    activeImage = image;
    enlargedImage.src = image.currentSrc || image.src;
    enlargedImage.alt = image.alt;
    dialog.showModal();
    closeButton.focus();
  }

  document.querySelectorAll('img:not(.brand-logo)').forEach(function (image) {
    if (image.closest('.image-lightbox')) {
      return;
    }

    image.tabIndex = 0;
    image.setAttribute('role', 'button');
    image.setAttribute('aria-haspopup', 'dialog');
    image.title = 'Click to enlarge';

    image.addEventListener('click', function (event) {
      event.preventDefault();
      openLightbox(image);
    });

    image.addEventListener('keydown', function (event) {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        openLightbox(image);
      }
    });
  });

  closeButton.addEventListener('click', closeLightbox);
  dialog.addEventListener('click', function (event) {
    if (event.target === dialog) {
      closeLightbox();
    }
  });
  dialog.addEventListener('cancel', function (event) {
    event.preventDefault();
    closeLightbox();
  });
  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape' && dialog.open) {
      event.preventDefault();
      closeLightbox();
    }
  });
  dialog.addEventListener('close', function () {
    enlargedImage.removeAttribute('src');
    if (activeImage) {
      activeImage.focus();
      activeImage = null;
    }
  });
})();
