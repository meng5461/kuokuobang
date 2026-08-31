const defaultView = document.getElementById('defaultView');
const successView = document.getElementById('successView');
const inviteCard = document.getElementById('inviteCard');
const stateLabel = document.getElementById('stateLabel');
const modalBackdrop = document.getElementById('modalBackdrop');
const toast = document.getElementById('toast');

const showSuccess = () => {
  defaultView.hidden = true;
  successView.hidden = false;
  inviteCard.classList.add('is-success');
  stateLabel.textContent = 'SUCCESS';
};

const showDefault = () => {
  successView.hidden = true;
  defaultView.hidden = false;
  inviteCard.classList.remove('is-success');
  stateLabel.textContent = 'DEFAULT';
};

const openDeclineModal = () => {
  modalBackdrop.hidden = false;
  document.getElementById('lookAgainBtn').focus();
};

const closeDeclineModal = () => {
  modalBackdrop.hidden = true;
};

let toastTimer;
const showToast = (message = '已暂时忽略邀请') => {
  toast.textContent = message;
  clearTimeout(toastTimer);
  toast.classList.add('show');
  toastTimer = setTimeout(() => toast.classList.remove('show'), 2200);
};

document.getElementById('joinBtn').addEventListener('click', showSuccess);
document.getElementById('homeBtn').addEventListener('click', () => showToast('扩扩帮首页即将打开'));
document.getElementById('backBtn').addEventListener('click', showDefault);
document.getElementById('declineBtn').addEventListener('click', openDeclineModal);
document.getElementById('modalClose').addEventListener('click', closeDeclineModal);
document.getElementById('lookAgainBtn').addEventListener('click', closeDeclineModal);
document.getElementById('confirmDeclineBtn').addEventListener('click', () => {
  closeDeclineModal();
  showToast();
});
modalBackdrop.addEventListener('click', (event) => {
  if (event.target === modalBackdrop) closeDeclineModal();
});
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && !modalBackdrop.hidden) closeDeclineModal();
});
