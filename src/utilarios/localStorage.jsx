export function salvarDespesas(lista) {
  localStorage.setItem('despesas', JSON.stringify(lista));
}

export function carregarDespesas() {
  return JSON.parse(localStorage.getItem('despesas')) || [];
}