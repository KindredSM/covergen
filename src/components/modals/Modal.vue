<template>
  <div class="modal-background">
    <div class="modal">
      <slot></slot>
    </div>
  </div>
</template>

<style>
@keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

.exit {
  cursor: pointer;
  position: absolute;
  top: 2rem;
  right: 2rem;
}

.modal-background {
  position: fixed;

  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  z-index: 100000;

  background: rgba(0, 0, 0, 0.8);

  display: flex;
  justify-content: center;
  align-items: center;

  animation: fadeIn 0.25s;
}

.modal {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  justify-content: space-between;
  padding: 50px 50px;

  width: 350px;
  max-width: 90vw;
  color: white;

  background: var(--color-background);
  border-radius: 8px;
}

.modal input {
  width: 100%;
  border: 1.00029px solid #ffffff;
  background-color: #f1f5f8;
  border-radius: 30px;

  padding: 10px;

  font-size: 15px;
}

.modal button {
  width: 100%;
  margin-top: 20px;
  padding: 15px;
  font-size: 20px;
  color: white;
  font-weight: bold;
  cursor: pointer;

  background: var(--colour-main);
  border-radius: 30px;
  transition: 0.25s opacity;
}

.modal button:hover {
  opacity: 0.8;
}

.exit {
  cursor: pointer;
  position: absolute;
  top: 2rem;
  right: 2rem;
}
.title {
  text-align: center;
  font-size: 24px;
  font-weight: 100;
}

.text,
.text-signup {
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;
  font-size: 14px;
  font-weight: 900;
  width: 100%;
  gap: 5px;
}
.bottom-text,
.bottom-text-generation {
  font-size: 10px;
  text-align: center;
}

.bottom-text-generation {
  color: #878193;
}

.account {
  text-align: center;
  font-size: 14px;
}

.link {
  cursor: pointer;
}

.slow {
  background: none !important;
  border: 1px solid white;
}

.link-signup {
  color: white;
}
.login-spinner {
  display: inline-block;
  width: 16px;
  height: 16px;
  margin-left: -30px;
  margin-top: -2px;
}

.button-modal {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 5px;
  justify-content: flex-start;
}

.login-spinner:after {
  content: ' ';
  display: block;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  border: 2px solid #fff;
  border-color: #fff transparent #fff transparent;
  animation: lds-dual-ring 1.2s linear infinite;
}
@keyframes lds-dual-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

@media screen and (max-width: 400px) {
  .login-spinner {
    margin-left: -25px;
  }
}
</style>
