const avatarPreview = document.getElementById('avatarPreview');
const avatarInput = document.getElementById('avatarInput');
const avatarState = document.getElementById('avatarState');
const stateLabel = document.getElementById('stateLabel');
const skipDialog = document.getElementById('skipDialog');
const screenToast = document.getElementById('screenToast');
let toastTimer;

function notify(message) {
  screenToast.textContent = message;
  screenToast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => screenToast.classList.remove('show'), 2200);
}

function resetAvatar() {
  const image = avatarPreview.querySelector('img');
  if (image) image.remove();
  avatarPreview.classList.remove('has-image');
  avatarPreview.setAttribute('aria-label', '默认头像');
  avatarState.textContent = '默认头像';
}

function showAuthorizedAvatar(file) {
  if (!file || !file.type.startsWith('image/')) {
    resetAvatar();
    notify('暂未获取头像，仍可继续使用');
    return;
  }

  const image = document.createElement('img');
  image.alt = '已授权的真实头像';
  image.addEventListener('load', () => {
    avatarPreview.classList.add('has-image');
    avatarPreview.setAttribute('aria-label', '真实头像');
    avatarState.textContent = '头像已更新';
    stateLabel.textContent = '授权成功 · 已展示真实头像';
    notify('头像已更新');
  });
  image.addEventListener('error', () => {
    resetAvatar();
    notify('头像加载失败，已保留默认头像');
  });
  image.src = URL.createObjectURL(file);
  avatarPreview.appendChild(image);
}

document.getElementById('backBtn').addEventListener('click', () => {
  notify('返回上一页');
  // 在真实小程序中这里接 wx.navigateBack()。
});

document.getElementById('authorizeBtn').addEventListener('click', () => {
  // 原型用系统文件选择器模拟“进入头像授权流程”。选择图片后即展示真实头像。
  avatarInput.click();
});

avatarInput.addEventListener('change', (event) => {
  showAuthorizedAvatar(event.target.files[0]);
  event.target.value = '';
});

document.getElementById('skipBtn').addEventListener('click', () => {
  skipDialog.hidden = false;
  document.getElementById('stayBtn').focus();
});

document.getElementById('dialogClose').addEventListener('click', () => { skipDialog.hidden = true; });
document.getElementById('stayBtn').addEventListener('click', () => { skipDialog.hidden = true; });
document.getElementById('confirmSkipBtn').addEventListener('click', () => {
  skipDialog.hidden = true;
  notify('已跳过头像设置，继续进入扩扩帮');
  stateLabel.textContent = '已跳过 · 进入后续流程';
});
skipDialog.addEventListener('click', (event) => {
  if (event.target === skipDialog) skipDialog.hidden = true;
});
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && !skipDialog.hidden) skipDialog.hidden = true;
});
