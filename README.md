# Projeto DAVI

O Projeto DAVI, Dispositivo Assistivo de Visão e Interação, é uma plataforma de tecnologia assistiva voltada para conectar software, comunicação alternativa, atividades digitais e dispositivos assistivos.

A proposta integra interfaces digitais, sensores físicos, microcontroladores, rastreamento ocular e inteligência artificial para apoiar pessoas com limitações motoras severas em atividades de comunicação, interação, aprendizagem e análise funcional.

## Módulos previstos

- Comunicação com dispositivos assistivos
- Sensores e acionadores
- Rastreamento ocular
- Perfis de acessibilidade
- Atividades assistivas
- Relatórios funcionais

## Rastreamento ocular

O site inclui um protótipo experimental de rastreamento ocular pela câmera do notebook. O recurso roda no navegador, solicita permissão de câmera e usa calibração por pontos para estimar a direção do olhar.

Em produção, o recurso deve ser usado em HTTPS. Em desenvolvimento local, também funciona em `localhost`.

## Tecnologias

- Next.js
- React
- TypeScript
- Tailwind CSS

## Como executar

Instale as dependências e inicie o servidor de desenvolvimento:

```bash
npm install
npm run dev
```

Depois acesse:

```text
http://localhost:3000
```

## Scripts disponíveis

- `npm run dev`: inicia o ambiente de desenvolvimento.
- `npm run build`: gera a versão de produção.
- `npm run start`: executa a versão de produção gerada.
- `npm run lint`: roda a análise estática do projeto.
