const MathApp = () => {
  const [currentView, setCurrentView] = useState('menu');
  const [homeworkView, setHomeworkView] = useState('selection');
  const [diagnosticView, setDiagnosticView] = useState('selection');
  const [olympiadView, setOlympiadView] = useState('selection');
  const [qcmView, setQcmView] = useState('selection');
  const [qcmAnswers, setQcmAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [visitorCount, setVisitorCount] = useState(0);
  
  // États pour l'agent IA
  const [showAIChat, setShowAIChat] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'assistant', content: '👋 Bonjour ! Je suis MathBot, votre assistant mathématiques. Je peux vous aider avec l\'algèbre, la géométrie, les fractions, les équations et bien plus ! Posez-moi vos questions.' }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  // Initialiser et incrémenter le compteur de visiteurs
  useEffect(() => {
    const initVisitorCount = async () => {
      try {
        const result = await window.storage.get('visitor-count', true);
        const currentCount = result ? parseInt(result.value) : 0;
        const newCount = currentCount + 1;
        await window.storage.set('visitor-count', newCount.toString(), true);
        setVisitorCount(newCount);
      } catch (error) {
        console.error('Erreur compteur:', error);
        setVisitorCount(1);
      }
    };
    initVisitorCount();
  }, []);
