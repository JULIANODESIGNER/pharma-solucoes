# Pharma Soluções - Website Institucional

![Pharma Soluções](https://img.shields.io/badge/Status-Ativo-brightgreen)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)

## 📋 Sobre o Projeto

Website institucional da **Pharma Soluções**, empresa especializada em consultoria em assuntos regulatórios para a indústria farmacêutica. O site apresenta os serviços, expertise e diferenciais da empresa de forma moderna e responsiva.

## 🚀 Características

- **Design Responsivo**: Otimizado para dispositivos móveis (até 350px)
- **Interface Moderna**: Design clean e profissional
- **Performance Otimizada**: Carregamento rápido e eficiente
- **SEO Friendly**: Estrutura otimizada para mecanismos de busca
- **Acessibilidade**: Seguindo boas práticas de acessibilidade web

## 🛠️ Tecnologias Utilizadas

- **HTML5**: Estrutura semântica e moderna
- **CSS3**: Estilização avançada com Flexbox e Grid
- **JavaScript**: Interatividade e funcionalidades dinâmicas
- **Font Awesome**: Ícones vetoriais
- **Google Fonts**: Tipografia (Inter)

## 📱 Responsividade

O site é totalmente responsivo e foi testado em:

- **Desktop**: 1200px+
- **Tablet**: 768px - 1199px
- **Mobile**: 350px - 767px
- **Mobile Pequeno**: até 350px

## 🎨 Estrutura do Site

### Página Principal (index.html)
- **Header**: Navegação fixa com logo e menu
- **Hero Section**: Apresentação principal com call-to-action
- **Sobre**: Informações sobre a empresa
- **Serviços**: Principais áreas de atuação
- **Expertise**: Conhecimento técnico e órgãos regulatórios
- **Cases**: Casos de sucesso
- **Blog**: Artigos e novidades
- **Contato**: Formulário e informações de contato
- **Footer**: Links úteis e informações adicionais

### Landing Page (landing.html)
- **Sobre Nós**: História e missão da empresa
- **Equipe Técnica**: Profissionais especializados
- **Principais Serviços**: Detalhamento dos serviços
- **Órgãos Regulatórios**: Expertise em regulamentação
- **Outros Serviços**: Serviços complementares
- **Contato**: Formulário de contato direto

## 🎯 Funcionalidades

- **Menu Mobile**: Navegação otimizada para dispositivos móveis
- **Formulário de Contato**: Integração com diferentes tipos de solicitação
- **Animações CSS**: Transições suaves e efeitos visuais
- **WhatsApp Integration**: Botão direto para contato via WhatsApp
- **Scroll Animations**: Animações ativadas pelo scroll

## 📂 Estrutura de Arquivos

```
pharma-solucoes/
├── index.html          # Página principal
├── landing.html        # Landing page
├── styles.css          # Estilos CSS
├── script.js           # JavaScript
├── images/             # Imagens do projeto
├── .htaccess          # Configurações do servidor
├── 404.html           # Página de erro 404
├── 500.html           # Página de erro 500
├── 403.html           # Página de erro 403
└── README.md          # Documentação
```

## 🎨 Paleta de Cores

- **Azul Principal**: #1e3c72
- **Azul Secundário**: #2a5298
- **Azul Claro**: #64b5f6
- **Cinza Escuro**: #333
- **Cinza Médio**: #666
- **Cinza Claro**: #f8f9fa
- **Branco**: #ffffff

## 📱 Media Queries

O CSS inclui media queries otimizadas para:

```css
/* Desktop */
@media (max-width: 1200px)

/* Tablet */
@media (max-width: 768px)

/* Mobile */
@media (max-width: 350px)
```

## 🚀 Como Executar

1. **Clone o repositório**:
   ```bash
   git clone https://github.com/JULIANODESIGNER/pharma-solucoes.git
   ```

2. **Navegue até o diretório**:
   ```bash
   cd pharma-solucoes
   ```

3. **Abra o arquivo index.html** em seu navegador ou use um servidor local:
   ```bash
   # Com Python
   python -m http.server 8000
   
   # Com Node.js (http-server)
   npx http-server
   ```

## 🌐 Deploy

O site está configurado para deploy em:

- **Servidor**: 173.212.228.165
- **Diretório**: /opt/pharmasolucoes/
- **Container Docker**: pharmasolucoes-app

### Comandos de Deploy

```bash
# Upload via SCP
scp -r * root@173.212.228.165:/opt/pharmasolucoes/

# Restart do container
ssh root@173.212.228.165 "docker restart pharmasolucoes-app"
```

## 📊 Performance

- **Lighthouse Score**: 90+
- **Tempo de Carregamento**: < 3s
- **Otimização de Imagens**: WebP quando possível
- **CSS Minificado**: Para produção
- **JavaScript Otimizado**: Código limpo e eficiente

## 🔧 Manutenção

### Arquivos de Acompanhamento

- **DEPLOY_SUCCESS_LOG.md**: Log de deploys bem-sucedidos
- **Acompanhamento de Etapas**: Progresso do desenvolvimento
- **Erros Conhecidos**: Documentação de problemas e soluções

### Boas Práticas Implementadas

- ✅ Código semântico e acessível
- ✅ Otimização para SEO
- ✅ Design responsivo
- ✅ Performance otimizada
- ✅ Segurança (sem exposição de credenciais)
- ✅ Documentação completa

## 📞 Contato

**Pharma Soluções**
- **Website**: [pharmasolucoes.com.br](https://pharmasolucoes.com.br)
- **Email**: contato@pharmasolucoes.com.br
- **WhatsApp**: +55 (11) 99999-9999

## 📄 Licença

Este projeto é propriedade da Pharma Soluções. Todos os direitos reservados.

---

**Desenvolvido com ❤️ para a Pharma Soluções**

*Última atualização: Janeiro 2025*