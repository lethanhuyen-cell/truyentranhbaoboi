'use client';

import React, { useState, useEffect, useRef } from 'react';

// ================= CONSTANTS & MOCKS =================
// The built-in stories have been removed from the main repository 
// as requested by the user, so they can add custom stories in the Admin panel.
const DEFAULT_STORIES = [
  {
    id: 'doan_ket_suc_manh',
    title: 'Sức Mạnh Của Sự Đoàn Kết',
    ageGroup: '5-8',
    author: 'Antigravity',
    duration: '8 phút',
    cover: '/images/cow_story/cow_page_1.png',
    tags: ['👦👧 5-8 tuổi', '📖 14 trang', '⏱️ 8 phút'],
    summary: 'Câu chuyện kể về một gia đình nhà bò trên đồng cỏ xanh mát. Dù đối mặt với thử thách từ bác Sư Tử to lớn, nhờ tinh thần đoàn kết và sự chia sẻ nhân hậu, họ không những tự bảo vệ được nhau mà còn xây dựng một tình bạn hòa bình ấm áp.',
    pedagogy: [
      'Giúp bé hiểu được giá trị to lớn của tinh thần đoàn kết, giúp đỡ lẫn nhau.',
      'Dạy bé cách giải quyết mâu thuẫn bằng sự nhân ái, thấu hiểu thay vì thù hận.',
      'Khơi dậy tình yêu thương gia đình và trách nhiệm bọc lót, che chở cho nhau.'
    ],
    questions: [
      'Tại sao bác Sư Tử lại không thể tiếp cận đàn bò khi họ đứng sát nhau?',
      'Bác Bò Già đã chỉ cho bác Sư Tử đi tìm thức ăn ở đâu?',
      'Bài học ý nghĩa nhất mà con rút ra từ câu chuyện này là gì?'
    ],
    badge: '🏆 Huy hiệu Đoàn Kết',
    badgeIcon: '🤝',
    pages: [
      {
        image: '/images/cow_story/cow_page_1.png',
        text: 'Ngày xửa ngày xưa, ở một thung lũng xanh mướt ngập tràn ánh nắng và hương hoa dại, có một gia đình nhà bò chung sống bên nhau. Đàn bò lúc nào cũng rộn rã tiếng cười, những chú bò con lon ton chạy nhảy trên thảm cỏ mềm mại như nhung. Bò Anh vui vẻ bảo: \'Cỏ hôm nay ngọt quá, các em ơi!\' Chú Bò Út reo lên: \'Sương sớm đọng trên lá như những viên pha lê lấp lánh này!\'',
        audio: ''
      },
      {
        image: '/images/cow_story/cow_page_2.png',
        text: 'Ở phía bên kia bìa rừng, có bác Sư Tử lông vàng óng ả đang dạo bước. Bác Sư Tử vốn là người mạnh mẽ nhất khu rừng và đang muốn tìm một chút thức ăn cho bữa trưa của mình. Bác đưa mắt nhìn về phía đồng cỏ xanh và tự nhủ: \'Chà, đàn bò bên kia trông mới ngon lành làm sao! Mình phải tìm cách tiếp cận họ mới được.\'',
        audio: ''
      },
      {
        image: '/images/cow_story/cow_page_3.png',
        text: 'Bác Sư Tử khẽ khàng tiến lại gần. Thấy bóng dáng to lớn với chiếc bờm vàng rực, chú Bò Đen giật mình hoảng hốt. Chú định quay đầu chạy trốn một mình vào lùm cây phía sau và kêu lên: \'Ôi giật mình quá! Bác Sư Tử to lớn đang đi đến kìa! Mình phải trốn đi thôi!\' Bác Sư Tử liền gầm khẽ: \'Đừng sợ, tôi chỉ muốn đến gần hơn một chút thôi mà!\'',
        audio: ''
      },
      {
        image: '/images/cow_story/cow_page_4.png',
        text: 'Nhìn thấy sự lúng túng của Bò Đen, bác Bò Già thông thái liền cất tiếng gọi trầm ấm. Bác hiểu rằng, nếu mỗi chú bò chạy một ngả, mọi người sẽ rất dễ gặp nguy hiểm và lạc mất nhau. Bác khuyên nhủ: \'Cả nhà ơi, đừng chạy tản mát! Hãy nhớ lời ông cha dặn: Một cây làm chẳng nên non, ba cây chụm lại nên hòn núi cao!\' Bò Vàng đồng ý: \'Đúng rồi, chúng ta phải đứng lại cùng nhau!\'',
        audio: ''
      },
      {
        image: '/images/cow_story/cow_page_5.png',
        text: 'Nghe lời Bò Già, ngay lập tức, các chú bò nhanh nhẹn bước chung một nhịp. Họ xếp thành một vòng tròn lớn vững chãi. Những chiếc sừng nhỏ cong cong hướng ra ngoài, còn các chú bò con được che chở an toàn ở chính giữa vòng tròn. Bò Út tự tin nói: \'Em không sợ nữa rồi, các anh chị bọc lót cho em chặt quá!\' Bò Nâu an ủi: \'Yên tâm nhé, chúng ta là một gia đình, luôn bảo vệ lẫn nhau!\'',
        audio: ''
      },
      {
        image: '/images/cow_story/cow_page_6.png',
        text: 'Bác Sư Tử bước tới, nhưng bước chân bỗng khựng lại. Trước mắt bác không phải là những chú bò nhút nhát chạy toán loạn, mà là một bức tường thành vững chắc, kiên cố và không có một kẽ hở nào. Bác Sư Tử gãi đầu ngơ ngác: \'Ơ kìa? Sao họ lại đứng thành một khối như vậy? Mình không biết phải đi vào từ lối nào cả!\'',
        audio: ''
      },
      {
        image: '/images/cow_story/cow_page_7.png',
        text: 'Bác Sư Tử không bỏ cuộc, bác thử đi vòng sang bên trái, rồi lại lững thững bước sang bên phải. Nhưng bác đi đến đâu, vòng tròn đàn bò lại nhịp nhàng xoay đến đó, luôn giữ thế chủ động và đoàn kết bảo vệ nhau. Bò Vàng dõng dạc nói: \'Dù hướng nào, chúng tôi cũng đồng lòng!\' Bác Sư Tử vô cùng ngạc nhiên: \'Lạ thật đấy, không một ai tách hàng, không một ai sợ hãi bỏ chạy sao?\'',
        audio: ''
      },
      {
        image: '/images/cow_story/cow_page_8.png',
        text: 'Đàn bò nhớ lại bài học ngày trước, khi họ còn hay tranh giành những ngọn cỏ non và đứng xa nhau, ai cũng dễ bị bắt nạt. Từ ngày hiểu được giá trị của sự hòa thuận, họ đã hứa sẽ không bao giờ để lòng ích kỷ chia rẽ tình anh em. Bò Đen tâm sự: \'Ngày xưa chúng ta thật khờ khạo khi cãi nhau.\' Bác Bò Già gật gù ôn tồn: \'Đúng vậy, bài học xương máu ấy giúp chúng ta hiểu rằng: Đoàn kết là sức mạnh vô địch!\'',
        audio: ''
      },
      {
        image: '/images/cow_story/cow_page_9.png',
        text: 'Thời gian trôi qua, mặt trời đã lên cao tỏa ánh nắng vàng rực rỡ. Bác Sư Tử đã mỏi rã rời cả đôi chân nhưng vẫn không thể tìm được cách nào để tiếp cận đàn bò. Bác ngồi sụp xuống thảm cỏ, thở dài sườn sượt: \'Mệt quá đi mất! Đàn bò này giống như một ngôi nhà đá kiên cố vậy, chẳng thể nào suy chuyển.\'',
        audio: ''
      },
      {
        image: '/images/cow_story/cow_page_10.png',
        text: 'Từ trong vòng tròn, bác Bò Già nhìn thấy vẻ mệt mỏi và chiếc bụng đang đói cồn cào của Sư Tử. Thay vì tức giận hay thù ghét, lòng nhân ái trong bác Bò Già trỗi dậy. Bác hiểu rằng ai cũng cần có thức ăn để sinh sống. Bác Bò Già cất tiếng hỏi: \'Bác Sư Tử ơi, bác đang rất đói và mệt phải không?\' Bác Sư Tử buồn bã đáp: \'Đúng vậy... Tôi đi tìm thức ăn từ sáng tới giờ mà chưa có gì vào bụng cả.\'',
        audio: ''
      },
      {
        image: '/images/cow_story/cow_page_11.png',
        text: 'Bác Bò Già ôn tồn giải thích và chỉ tay về phía thung lũng bên cạnh, nơi có rất nhiều cây ăn quả chín mọng và những nguồn thức ăn khác phù hợp cho muôn loài trong rừng. Đàn bò luôn sẵn lòng chia sẻ thông tin để mọi người cùng sống hòa bình. Bác Bò Già chỉ dẫn: \'Chúng tôi là một khối đoàn kết, bác không thể làm hại chúng tôi đâu. Nhưng ở thung lũng phía tây kia có rất nhiều trái cây ngọt và những dòng suối mát lành, bác có thể qua đó thưởng thức!\' Bác Sư Tử sáng mắt lên: \'Thật thế sao? Ở đó có đồ ăn cho tôi à?\'',
        audio: ''
      },
      {
        image: '/images/cow_story/cow_page_12.png',
        text: 'Nghe những lời nói chân thành và đầy tình thương của bác Bò Già, bác Sư Tử bỗng cảm thấy lòng mình ấm áp lạ thường. Bác nhận ra rằng, bạo lực không mang lại kết quả tốt đẹp, và sự tử tế mới là điều đáng quý nhất. Bác Sư Tử xúc động nói: \'Cảm ơn bác Bò Già và đàn bò nhé! Sự đoàn kết của các bạn làm tôi khâm phục, và sự nhân hậu của các bạn làm tôi cảm động.\'',
        audio: ''
      },
      {
        image: '/images/cow_story/cow_page_13.png',
        text: 'Thấy Sư Tử đã hiểu ra điều phải trái, vòng tròn đàn bò từ từ mở ra. Họ cùng nhau vẫy tay chào bác Sư Tử lông vàng. Không còn khoảng cách, không còn sợ hãi, giữa họ giờ đây là sợi dây của sự thấu hiểu. Đàn bò đồng thanh kêu lên vui vẻ: \'Tạm biệt bác Sư Tử! Chúc bác có một bữa trưa ngon miệng ở thung lũng phía tây nhé!\' Bác Sư Tử cũng vẫy chào lại: \'Tạm biệt những người bạn thông minh và đoàn kết!\'',
        audio: ''
      },
      {
        image: '/images/cow_story/cow_page_14.png',
        text: 'Bác Sư Tử vui vẻ bước đi về phía thung lũng mới. Trên đồng cỏ xanh, đàn bò lại cùng nhau quây quần, rộn rã tiếng ca. Câu chuyện về lòng đoàn kết và sự thấu hiểu của họ mãi là bài học ấm áp, nhắc nhở chúng ta rằng: Khi nắm chặt tay nhau, chúng ta có thể vượt qua mọi thử thách một cách bình yên nhất. Bò Út ngân nga hát: \'La la la! Đoàn kết là sức mạnh, yêu thương là nụ cười!\' Bác Bò Già mỉm cười xoa đầu chú bò con: \'Đúng vậy, các cháu yêu quý. Hãy luôn thương yêu và bảo vệ lẫn nhau nhé!\'',
        audio: ''
      }
    ]
  }
];

export default function App() {
  // ================= APPLICATION STATE =================
  const [stories, setStories] = useState([]);
  const [currentScreen, setCurrentScreen] = useState('gatekeeper'); // gatekeeper, home, age-hub, detail, reader, bedtime, library, admin
  const [selectedAgeGroup, setSelectedAgeGroup] = useState(null); // 5-8, 9-12, 12-15
  const [selectedStoryId, setSelectedStoryId] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [readingProgress, setReadingProgress] = useState({});
  const [unlockedBadges, setUnlockedBadges] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Active reading state
  const [reader, setReader] = useState({
    story: null,
    currentPage: 0,
    isPlaying: false,
    isTextHidden: false,
    textSize: 'lg', // md, lg, xl
    isAutoFlip: false,
    audioProgress: 0,
    audioTime: 0,
    audioDuration: 15,
    selectedVoice: 'female', // female (banmai), male (leminh)
  });

  const [isAudioLoading, setIsAudioLoading] = useState(false);

  // Bedtime Mode State
  const [bedtime, setBedtime] = useState({
    duration: '10', // 10, 20, 30 minutes
    ageGroup: 'all',
    isPlaying: false,
    timerSeconds: 0,
    playlist: [],
    currentStoryIndex: 0,
  });

  // Admin Form State
  const [adminForm, setAdminForm] = useState({
    title: '',
    ageGroup: '5-8',
    author: '',
    duration: '5 phút',
    summary: '',
    pages: [{ text: '', imageSvgText: '📖', audio: '' }]
  });

  // Audio References
  const htmlAudioRef = useRef(null);
  const timerIntervalRef = useRef(null);
  const sleepTimerIntervalRef = useRef(null);
  const scrollRef = useRef(null);

  // ================= STATE INITIALIZATION =================
  useEffect(() => {
    // Load custom stories
    const custom = localStorage.getItem('bb_custom_stories');
    let loadedStories = [...DEFAULT_STORIES];
    if (custom) {
      try {
        const parsed = JSON.parse(custom);
        if (Array.isArray(parsed)) {
          loadedStories = [...DEFAULT_STORIES, ...parsed];
        }
      } catch (e) {
        console.error("Failed to parse custom stories", e);
      }
    }
    setStories(loadedStories);

    // Load user preferences
    setFavorites(safeParseJSON(localStorage.getItem('bb_favorites'), []));
    setReadingProgress(safeParseJSON(localStorage.getItem('bb_progress'), {}));
    setUnlockedBadges(safeParseJSON(localStorage.getItem('bb_badges'), []));
    
    const savedVoice = localStorage.getItem('bb_selected_voice') || 'female';
    setReader(prev => ({ ...prev, selectedVoice: savedVoice }));

    return () => {
      stopAllAudio();
    };
  }, []);

  // Sync bedtime playlist whenever filters or stories change
  useEffect(() => {
    let list = stories;
    if (bedtime.ageGroup !== 'all') {
      list = list.filter(s => s.ageGroup === bedtime.ageGroup);
    }
    // Filter playlist
    setBedtime(prev => ({
      ...prev,
      playlist: list,
      currentStoryIndex: 0
    }));
  }, [stories, bedtime.ageGroup]);

  // Helper for safe JSON parsing
  function safeParseJSON(item, defaultVal) {
    if (!item) return defaultVal;
    try {
      return JSON.parse(item);
    } catch (e) {
      return defaultVal;
    }
  }

  // ================= CONTROLLERS & FUNCTIONS =================
  const navigateTo = (screen, params = {}) => {
    stopAllAudio();
    setCurrentScreen(screen);
    setIsSearchOpen(false);
    setSearchQuery('');

    if (params.ageGroup) setSelectedAgeGroup(params.ageGroup);
    if (params.storyId) {
      setSelectedStoryId(params.storyId);
      const matched = stories.find(s => s.id === params.storyId);
      if (matched) {
        setReader(prev => {
          const savedPage = readingProgress[params.storyId] || 0;
          return {
            ...prev,
            story: matched,
            currentPage: savedPage,
            isPlaying: false,
            audioProgress: 0,
            audioTime: 0,
          };
        });
      }
    }
  };

  const stopAllAudio = () => {
    // Stop regular story audio
    if (htmlAudioRef.current) {
      htmlAudioRef.current.pause();
      htmlAudioRef.current = null;
    }
    if (timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current);
    }
    setReader(prev => ({ ...prev, isPlaying: false }));
    setIsAudioLoading(false);

    // Stop bedtime timers
    if (sleepTimerIntervalRef.current) {
      clearInterval(sleepTimerIntervalRef.current);
    }
    setBedtime(prev => ({ ...prev, isPlaying: false, timerSeconds: 0 }));
  };

  // Toggle favorite
  const toggleFavorite = (storyId) => {
    let newFavs = [...favorites];
    if (newFavs.includes(storyId)) {
      newFavs = newFavs.filter(id => id !== storyId);
    } else {
      newFavs.push(storyId);
    }
    setFavorites(newFavs);
    localStorage.setItem('bb_favorites', JSON.stringify(newFavs));
  };

  // ================= TTS AUDIO ENGINE =================
  const fetchTtsAudio = async (text, voice) => {
    try {
      const response = await fetch('/api/tts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, voice }),
      });
      const data = await response.json();
      if (data.async) {
        return data.async;
      } else if (data.success === 'true' || data.message) {
        return data.message || data.async;
      }
    } catch (e) {
      console.error("API route TTS request failed", e);
    }
    return null;
  };

  const playNarrator = async () => {
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    if (htmlAudioRef.current) {
      htmlAudioRef.current.pause();
      htmlAudioRef.current = null;
    }

    const { story, currentPage, selectedVoice } = reader;
    if (!story || !story.pages) return;

    const pageData = story.pages[currentPage];
    if (!pageData) return;

    let audioUrl = pageData.audio;

    // If page doesn't have an audio file, generate it dynamically on the fly
    if (!audioUrl) {
      setIsAudioLoading(true);
      const voiceKey = selectedVoice === 'female' ? 'banmai' : 'leminh';
      const result = await fetchTtsAudio(pageData.text, voiceKey);
      
      if (result) {
        // If FPT.AI returned an async task URL, poll until ready
        if (result.includes('/v5/task/')) {
          let attempts = 0;
          const pollInterval = setInterval(async () => {
            attempts++;
            if (attempts > 20) {
              clearInterval(pollInterval);
              setIsAudioLoading(false);
              alert("Kết nối giọng đọc AI bị quá hạn. Vui lòng thử lại!");
              return;
            }
            try {
              const res = await fetch(result);
              if (res.status === 200) {
                clearInterval(pollInterval);
                setIsAudioLoading(false);
                // Cache audio URL in memory
                pageData.audio = result;
                savePageAudioToCache(story.id, currentPage, result);
                startPlayingAudio(result);
              }
            } catch (e) {
              // Ignore network errors during polling
            }
          }, 2000);
          return;
        } else {
          // Direct audio url returned
          setIsAudioLoading(false);
          pageData.audio = result;
          savePageAudioToCache(story.id, currentPage, result);
          audioUrl = result;
        }
      } else {
        setIsAudioLoading(false);
        alert("Không thể kết nối đến giọng đọc AI. Đang phát bằng giọng mặc định trình duyệt.");
        // Fallback to Web Speech API
        speakWebSpeech(pageData.text);
        return;
      }
    }

    if (audioUrl) {
      startPlayingAudio(audioUrl);
    }
  };

  const savePageAudioToCache = (storyId, pageIdx, audioUrl) => {
    // Save generated audio URL back to custom stories list in LocalStorage
    const custom = localStorage.getItem('bb_custom_stories');
    if (custom) {
      try {
        const parsed = JSON.parse(custom);
        if (Array.isArray(parsed)) {
          const updated = parsed.map(s => {
            if (s.id === storyId && s.pages) {
              const pagesCopy = [...s.pages];
              if (pagesCopy[pageIdx]) {
                pagesCopy[pageIdx].audio = audioUrl;
              }
              return { ...s, pages: pagesCopy };
            }
            return s;
          });
          localStorage.setItem('bb_custom_stories', JSON.stringify(updated));
          // Sync state stories
          setStories(updated);
        }
      } catch (e) {}
    }
  };

  const startPlayingAudio = (url) => {
    const audioObj = new Audio(url);
    htmlAudioRef.current = audioObj;
    
    audioObj.playbackRate = currentScreen === 'bedtime' ? 0.85 : 0.95;
    
    audioObj.onended = () => {
      setReader(prev => ({
        ...prev,
        audioProgress: 100,
        audioTime: prev.audioDuration
      }));

      // Autoplay next page if enabled
      if (reader.isAutoFlip) {
        setTimeout(() => {
          nextReaderPage();
        }, 1500);
      } else {
        setReader(prev => ({ ...prev, isPlaying: false }));
      }
    };

    audioObj.ontimeupdate = () => {
      setReader(prev => ({
        ...prev,
        audioTime: Math.round(audioObj.currentTime),
        audioDuration: Math.round(audioObj.duration) || 15,
        audioProgress: (audioObj.currentTime / (audioObj.duration || 1)) * 100
      }));
    };

    setReader(prev => ({ ...prev, isPlaying: true }));
    audioObj.play().catch(err => {
      console.error("Audio playback error, falling back to Web Speech", err);
      speakWebSpeech(reader.story.pages[reader.currentPage].text);
    });
  };

  const speakWebSpeech = (text) => {
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel();

    // Clean punctuation
    const cleanedText = text.replace(/[,.;?!:—\-\"\'\(\)\[\]\{\}]/g, ' ');
    const utterance = new SpeechSynthesisUtterance(cleanedText);
    utterance.lang = 'vi-VN';
    utterance.rate = reader.selectedVoice === 'female' ? 0.80 : 0.76;
    
    utterance.onend = () => {
      if (reader.isAutoFlip) {
        setTimeout(() => {
          nextReaderPage();
        }, 1500);
      } else {
        setReader(prev => ({ ...prev, isPlaying: false }));
      }
    };

    setReader(prev => ({ ...prev, isPlaying: true }));
    window.speechSynthesis.speak(utterance);

    // Simulate progress bar countdown
    let elapsed = 0;
    const duration = 15;
    setReader(prev => ({ ...prev, audioDuration: duration, audioProgress: 0, audioTime: 0 }));
    
    timerIntervalRef.current = setInterval(() => {
      elapsed += 0.5;
      if (elapsed <= duration) {
        setReader(prev => ({
          ...prev,
          audioTime: Math.round(elapsed),
          audioProgress: (elapsed / duration) * 100
        }));
      } else {
        clearInterval(timerIntervalRef.current);
      }
    }, 500);
  };

  const toggleReaderAudio = () => {
    if (reader.isPlaying) {
      if (htmlAudioRef.current) {
        htmlAudioRef.current.pause();
      }
      if (window.speechSynthesis) {
        window.speechSynthesis.pause();
      }
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
      setReader(prev => ({ ...prev, isPlaying: false }));
    } else {
      playNarrator();
    }
  };

  const exitReader = () => {
    stopAllAudio();
    // Save progress to local storage
    if (reader.story) {
      const updatedProgress = {
        ...readingProgress,
        [reader.story.id]: reader.currentPage
      };
      setReadingProgress(updatedProgress);
      localStorage.setItem('bb_progress', JSON.stringify(updatedProgress));

      // Trigger Badge Unlock if last page reached
      if (reader.currentPage >= reader.story.pages.length - 1) {
        unlockBadge(reader.story.badge || '🏆 Huy hiệu Trí Tuệ', reader.story.badgeIcon || '✨');
      }
    }
    navigateTo('detail', { storyId: reader.story?.id });
  };

  const unlockBadge = (badgeName, icon) => {
    const list = [...unlockedBadges];
    if (!list.some(b => b.badge === badgeName)) {
      const now = new Date();
      const dateStr = `${now.getDate().toString().padStart(2, '0')}/${(now.getMonth() + 1).toString().padStart(2, '0')}/${now.getFullYear()}`;
      list.push({ badge: badgeName, icon: icon, date: dateStr });
      setUnlockedBadges(list);
      localStorage.setItem('bb_badges', JSON.stringify(list));
      
      // Trigger visually attractive popup
      alert(`🎉 Bé đạt huy hiệu mới: ${badgeName}! Con giỏi lắm!`);
    }
  };

  const nextReaderPage = () => {
    if (!reader.story) return;
    const nextIdx = reader.currentPage + 1;
    if (nextIdx < reader.story.pages.length) {
      setReader(prev => ({
        ...prev,
        currentPage: nextIdx,
        audioProgress: 0,
        audioTime: 0
      }));
      // Auto-trigger narration on page turn if already playing
      setTimeout(() => {
        playNarrator();
      }, 300);
    } else {
      // Last page finished
      exitReader();
    }
  };

  const prevReaderPage = () => {
    const prevIdx = reader.currentPage - 1;
    if (prevIdx >= 0) {
      setReader(prev => ({
        ...prev,
        currentPage: prevIdx,
        audioProgress: 0,
        audioTime: 0
      }));
      setTimeout(() => {
        playNarrator();
      }, 300);
    }
  };

  const cycleTextSize = () => {
    setReader(prev => {
      const sizes = ['md', 'lg', 'xl'];
      const nextIdx = (sizes.indexOf(prev.textSize) + 1) % sizes.length;
      return { ...prev, textSize: sizes[nextIdx] };
    });
  };

  // Helper for text size styles
  const getTextSizeClass = () => {
    if (reader.textSize === 'md') return 'text-xs';
    if (reader.textSize === 'xl') return 'text-lg';
    return 'text-sm font-semibold';
  };

  // ================= SLEEP TIMER / BEDTIME CONTROLLERS =================
  const setSleepTimer = (seconds) => {
    if (sleepTimerIntervalRef.current) clearInterval(sleepTimerIntervalRef.current);
    setBedtime(prev => ({ ...prev, timerSeconds: seconds }));
    
    sleepTimerIntervalRef.current = setInterval(() => {
      setBedtime(prev => {
        if (prev.timerSeconds > 1) {
          return { ...prev, timerSeconds: prev.timerSeconds - 1 };
        } else {
          // Timer finished
          clearInterval(sleepTimerIntervalRef.current);
          stopAllAudio();
          return { ...prev, timerSeconds: 0, isPlaying: false };
        }
      });
    }, 1000);
  };

  const cancelSleepTimer = () => {
    if (sleepTimerIntervalRef.current) clearInterval(sleepTimerIntervalRef.current);
    setBedtime(prev => ({ ...prev, timerSeconds: 0 }));
  };

  const toggleBedtimePlay = () => {
    const nextPlaying = !bedtime.isPlaying;
    setBedtime(prev => ({ ...prev, isPlaying: nextPlaying }));
    
    if (nextPlaying) {
      startBedtimePlay();
    } else {
      if (htmlAudioRef.current) htmlAudioRef.current.pause();
      if (window.speechSynthesis) window.speechSynthesis.cancel();
    }
  };

  const startBedtimePlay = () => {
    const story = bedtime.playlist[bedtime.currentStoryIndex];
    if (!story || !story.pages) return;

    // Combine page texts into a long whispering narrative
    const text = story.pages.map(p => p.text).join('... ');
    speakWebSpeech(text);
  };

  // ================= ADMIN MANAGEMENT =================
  const updateAdminField = (key, val) => {
    setAdminForm(prev => ({ ...prev, [key]: val }));
  };

  const updateAdminPage = (idx, key, val) => {
    setAdminForm(prev => {
      const copy = [...prev.pages];
      if (copy[idx]) {
        copy[idx] = { ...copy[idx], [key]: val };
      }
      return { ...prev, pages: copy };
    });
  };

  const addAdminPage = () => {
    setAdminForm(prev => ({
      ...prev,
      pages: [...prev.pages, { text: '', imageSvgText: '📖', audio: '' }]
    }));
  };

  const removeAdminPage = (idx) => {
    setAdminForm(prev => {
      if (prev.pages.length <= 1) return prev;
      const copy = [...prev.pages];
      copy.splice(idx, 1);
      return { ...prev, pages: copy };
    });
  };

  const generatePageAudio = async (idx) => {
    const text = adminForm.pages[idx]?.text;
    if (!text) {
      alert("Vui lòng nhập lời kể cho trang này trước khi tạo Audio!");
      return;
    }
    const voiceKey = localStorage.getItem('bb_fpt_voice') || 'banmai';

    // UI Loading indicator
    const btn = document.getElementById(`btn-gen-audio-${idx}`);
    if (btn) {
      btn.disabled = true;
      btn.innerHTML = "⏳ Đang tạo...";
    }

    const result = await fetchTtsAudio(text, voiceKey);

    if (result) {
      if (result.includes('/v5/task/')) {
        let attempts = 0;
        const checkInterval = setInterval(async () => {
          attempts++;
          if (attempts > 20) {
            clearInterval(checkInterval);
            if (btn) {
              btn.disabled = false;
              btn.innerHTML = "🎙️ Tạo Audio AI (Hà Nội)";
            }
            alert("Tạo audio quá thời gian chờ (Timeout). Vui lòng thử lại!");
            return;
          }
          try {
            const statusRes = await fetch(result);
            if (statusRes.status === 200) {
              clearInterval(checkInterval);
              updateAdminPage(idx, 'audio', result);
              if (btn) {
                btn.disabled = false;
                btn.innerHTML = "✅ Hoàn thành";
              }
            }
          } catch (e) {}
        }, 2000);
      } else {
        updateAdminPage(idx, 'audio', result);
        if (btn) {
          btn.disabled = false;
          btn.innerHTML = "✅ Hoàn thành";
        }
      }
    } else {
      if (btn) {
        btn.disabled = false;
        btn.innerHTML = "🎙️ Tạo Audio AI (Hà Nội)";
      }
      alert("Không thể kết nối API tạo giọng đọc. Vui lòng thử lại!");
    }
  };

  const publishNewStory = () => {
    if (!adminForm.title || !adminForm.summary) {
      alert("Vui lòng điền đầy đủ Tiêu đề và Tóm tắt truyện!");
      return;
    }

    const formattedPages = adminForm.pages.map((p, idx) => {
      const svgText = p.imageSvgText || '📖';
      const dynamicSvg = `data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='600' viewBox='0 0 800 600'><rect width='100%' height='100%' fill='%23FFF9EE'/><text x='50%' y='40%' font-size='100' text-anchor='middle'>${svgText}</text><text x='50%' y='65%' font-size='28' font-family='sans-serif' font-weight='bold' fill='%231f2430' text-anchor='middle'>Trang Truyện Số ${idx + 1}</text></svg>`;
      return {
        image: dynamicSvg,
        text: p.text || `Nội dung lời kể cho trang ${idx + 1} của truyện.`,
        audio: p.audio || ''
      };
    });

    const newId = 'custom_' + Date.now();
    const ageEmoji = adminForm.ageGroup === '5-8' ? '👦👧' : (adminForm.ageGroup === '9-12' ? '🧑‍🤝‍🧑' : '🧑‍🦱👩‍🦱');
    
    const newStory = {
      id: newId,
      title: adminForm.title,
      ageGroup: adminForm.ageGroup,
      author: adminForm.author || 'Danh nhân',
      duration: adminForm.duration || '5 phút',
      cover: formattedPages[0].image,
      tags: [`${ageEmoji} ${adminForm.ageGroup} tuổi`, `📖 ${formattedPages.length} trang`, `⏱️ ${adminForm.duration}`],
      summary: adminForm.summary,
      pedagogy: [
        'Truyện tự biên soạn tăng tính độc lập và sáng tạo riêng.',
        'Dễ dàng tùy biến lời thoại để phù hợp nhất với con.',
        'Có thể thay đổi và bổ sung tranh vẽ linh hoạt.'
      ],
      questions: [
        'Con thích nhất nhân vật nào trong câu chuyện vừa rồi?',
        'Nếu con được đặt lại tên truyện, con sẽ đặt tên là gì?',
        'Câu chuyện này mang lại bài học gì bổ ích cho con?'
      ],
      badge: '🏆 Huy hiệu Tự Lập',
      badgeIcon: '✨',
      pages: formattedPages
    };

    const custom = localStorage.getItem('bb_custom_stories');
    let customList = [];
    if (custom) {
      try {
        customList = JSON.parse(custom);
      } catch (e) {}
    }
    if (!Array.isArray(customList)) customList = [];
    customList.push(newStory);
    localStorage.setItem('bb_custom_stories', JSON.stringify(customList));

    // Reload Database
    setStories([...DEFAULT_STORIES, ...customList]);

    // Reset Form
    setAdminForm({
      title: '',
      ageGroup: '5-8',
      author: '',
      duration: '5 phút',
      summary: '',
      pages: [{ text: '', imageSvgText: '📖', audio: '' }]
    });

    alert("Đăng truyện thành công! Truyện của chị đã có mặt ngoài Trang chủ.");
    navigateTo('home');
  };

  const deleteCustomStory = (id) => {
    if (confirm("Chị có chắc chắn muốn xóa cuốn truyện tự tạo này khỏi danh sách?")) {
      const custom = localStorage.getItem('bb_custom_stories');
      if (custom) {
        try {
          let customList = JSON.parse(custom);
          if (Array.isArray(customList)) {
            customList = customList.filter(s => s.id !== id);
            localStorage.setItem('bb_custom_stories', JSON.stringify(customList));
            
            // Reload stories state
            setStories([...DEFAULT_STORIES, ...customList]);
          }
        } catch(e) {}
      }
    }
  };

  // Helper for dynamic story cover rendering
  const getStoryCover = (story, size = 'large') => {
    if (!story || !story.cover) {
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-full h-full" viewBox="0 0 400 300">
          <rect width="100%" height="100%" fill="#FFF9EE" />
          <text x="50%" y="55%" fontSize="50" textAnchor="middle">📖</text>
        </svg>
      );
    }
    
    if (story.cover.startsWith('data:')) {
      // Scale dynamic SVG sizes inside React
      let cov = story.cover;
      if (size === 'small') {
        cov = cov.replace(/width=['"]400['"]/g, "width='120'")
                 .replace(/height=['"]300['"]/g, "height='90'")
                 .replace(/width=['"]800['"]/g, "width='120'")
                 .replace(/height=['"]600['"]/g, "height='90'")
                 .replace(/font-size=['"]70['"]/g, "font-size='30'")
                 .replace(/font-size=['"]22['"]/g, "font-size='8'");
      }
      return <div className="w-full h-full flex items-center justify-center" dangerouslySetInnerHTML={{ __html: cov.substring(cov.indexOf('<svg')) }} />;
    }

    return <img src={story.cover} alt={story.title} className="w-full h-full object-cover" />;
  };

  function formatAudioTime(secs) {
    const m = Math.floor(secs / 60).toString().padStart(2, '0');
    const s = (secs % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  }

  // ================= VIEW STATE SUBCOMPONENTS =================
  
  // Render Header Component
  const renderHeader = () => {
    const isNight = currentScreen === 'bedtime';
    const isHub = currentScreen === 'age-hub';
    const isDetail = currentScreen === 'detail';
    const isReader = currentScreen === 'reader';
    const isGatekeeper = currentScreen === 'gatekeeper';

    if (isReader || isGatekeeper) return null;

    let titleText = 'Bảo Bối';
    let titleClass = 'text-lg font-black font-outfit tracking-tight';

    if (isHub) {
      titleText = selectedAgeGroup === '5-8' ? 'Cánh Cửa Cổ Tích' : (selectedAgeGroup === '9-12' ? 'Bản Đồ Phiêu Lưu' : 'Phòng Giải Mã');
    } else if (isDetail) {
      titleText = 'Chi tiết truyện';
    } else if (isNight) {
      titleText = 'Giờ Đi Ngủ';
    } else if (currentScreen === 'library') {
      titleText = 'Yêu thích';
    } else if (currentScreen === 'admin') {
      titleText = 'Quản lý Thư viện';
    }

    const headerBg = isNight ? 'bg-[#0f172a]/95 text-white border-b border-white/5' : 'glass-header text-textPrimary border-b border-textSecondary/10';

    return (
      <header className={`w-full h-14 min-h-14 px-4 flex justify-between items-center z-20 absolute top-0 left-0 right-0 ${headerBg}`}>
        <div className="flex items-center">
          {currentScreen !== 'home' && currentScreen !== 'gatekeeper' && (
            <button 
              onClick={() => {
                if (isHub || isDetail) navigateTo('gatekeeper');
                else navigateTo('home');
              }} 
              className={`w-9 h-9 flex items-center justify-center rounded-full active:scale-90 transition-all mr-2 ${isNight ? 'bg-white/10 hover:bg-white/20' : 'bg-textPrimary/5 hover:bg-textPrimary/10'}`}
              title="Quay lại"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="w-5 h-5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
            </button>
          )}

          <h2 className={`${titleClass} truncate max-w-[170px]`}>
            {titleText}
            {currentScreen === 'home' && <span className="text-honeyYellow">.</span>}
          </h2>
        </div>

        <div className="flex items-center gap-2">
          {currentScreen === 'home' && (
            <div className="flex items-center">
              {isSearchOpen && (
                <input 
                  type="text" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Tìm truyện..." 
                  className="px-3 py-1.5 text-xs rounded-xl bg-white border border-textSecondary/20 focus:outline-none focus:border-honeyYellow w-28 mr-1.5 animate-fade-in"
                />
              )}
              <button 
                onClick={() => {
                  setIsSearchOpen(!isSearchOpen);
                  setSearchQuery('');
                }} 
                className="w-9 h-9 flex items-center justify-center rounded-full bg-textPrimary/5 text-textPrimary hover:bg-textPrimary/10 transition-all"
              >
                🔍
              </button>
            </div>
          )}

          {currentScreen === 'home' && (
            <button 
              onClick={() => navigateTo('gatekeeper')} 
              className="w-8.5 h-8.5 flex items-center justify-center rounded-full bg-textPrimary/5 text-textPrimary hover:bg-textPrimary/10 active:scale-90 transition-all mr-1"
              title="Quay về cổng chọn tuổi"
            >
              👦
            </button>
          )}

          <button 
            onClick={() => navigateTo('admin')} 
            className={`w-9 h-9 flex items-center justify-center rounded-full active:scale-90 transition-all ${isNight ? 'bg-white/10 text-white' : 'bg-textPrimary/5 text-textPrimary'}`}
            title="Admin"
          >
            ⚙️
          </button>
        </div>
      </header>
    );
  };

  // Render Bottom Navigation
  const renderBottomNav = () => {
    const isNight = currentScreen === 'bedtime';
    const isGatekeeper = currentScreen === 'gatekeeper';
    const isReader = currentScreen === 'reader';

    if (isGatekeeper || isReader) return null;

    const navBg = isNight ? 'bg-[#0f172a]/90 text-white/50 border-t border-white/5' : 'glass-nav text-textSecondary';
    const activeColor = isNight ? 'text-honeyYellow' : 'text-textPrimary';

    const tabs = [
      { id: 'home', label: 'Nhà', icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.2" stroke="currentColor" className="w-5 h-5"><path stroke-linecap="round" stroke-linejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" /></svg> },
      { id: 'explore', label: 'Khám phá', icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.2" stroke="currentColor" className="w-5 h-5"><path stroke-linecap="round" stroke-linejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-.778.099-1.533.284-2.253" /></svg> },
      { id: 'bedtime', label: 'Đêm', icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.2" stroke="currentColor" className="w-5 h-5"><path stroke-linecap="round" stroke-linejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" /></svg> },
      { id: 'library', label: 'Yêu thích', icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.2" stroke="currentColor" className="w-5 h-5"><path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" /></svg> }
    ];

    return (
      <footer className={`absolute bottom-0 left-0 right-0 h-16 min-h-16 ${navBg} z-20 flex justify-around items-center px-2`}>
        {tabs.map(tab => {
          let isActive = currentScreen === tab.id;
          if (tab.id === 'explore' && currentScreen === 'age-hub') isActive = true;
          
          const activeClass = isActive ? activeColor : 'opacity-60';
          const clickAction = tab.id === 'explore' ? () => navigateTo('age-hub', { ageGroup: '5-8' }) : () => navigateTo(tab.id);

          return (
            <button 
              key={tab.id}
              onClick={clickAction}
              className={`flex-1 h-full flex flex-col justify-center items-center ${activeClass} active:scale-95 transition-transform`}
            >
              {tab.icon}
              <span className="text-[10px] font-bold mt-1">{tab.label}</span>
            </button>
          );
        })}
      </footer>
    );
  };

  // Render Gatekeeper screen
  const renderGatekeeperScreenView = () => {
    return (
      <div className="w-full min-h-full flex flex-col justify-between p-6 bg-gradient-to-b from-[#FFFDF9] to-[#FFF4D8]">
        <div className="flex flex-col items-center mt-6 text-center select-none animate-fade-in">
          <div className="w-14 h-14 rounded-2xl bg-honeyYellow/15 border border-honeyYellow/30 flex items-center justify-center text-honeyYellow shadow-md mb-3">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.3" stroke="currentColor" className="w-7 h-7">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
            </svg>
          </div>
          <h1 className="font-outfit font-black text-3xl text-textPrimary tracking-tight">Bảo Bối<span className="text-honeyYellow">.</span></h1>
          <p className="text-xs text-textSecondary font-bold uppercase tracking-widest mt-1 font-outfit">Interactive Storybook</p>
        </div>

        <div className="my-auto py-8 flex flex-col gap-4">
          <div className="text-center mb-2">
            <h2 className="text-lg font-bold text-textPrimary leading-tight">Chào mừng con đến với thư viện</h2>
            <p className="text-xs text-textSecondary font-medium mt-1">Con hãy chọn tầng sách phù hợp tuổi của mình nhé!</p>
          </div>

          <div onClick={() => navigateTo('age-hub', { ageGroup: '5-8' })} className="w-full bg-[#FFF9EE] border-2 border-softEarthPink/30 hover:border-softEarthPink rounded-2xl p-4 flex items-center gap-4 cursor-pointer active:scale-[0.98] transition-all shadow-sm hover:shadow-md">
            <div className="w-12 h-12 rounded-xl bg-softEarthPink/10 text-softEarthPink flex items-center justify-center text-3xl flex-shrink-0">
              👦👧
            </div>
            <div className="flex-1 min-w-0">
              <span className="text-[9px] font-bold text-softEarthPink uppercase tracking-wider bg-softEarthPink/10 px-2 py-0.5 rounded">TẦNG 1 • 5–8 TUỔI</span>
              <h3 className="text-sm font-bold text-textPrimary mt-1">Cánh Cửa Cổ Tích</h3>
              <p className="text-[11px] text-textSecondary font-semibold leading-normal truncate">Tranh lớn, chữ ngắn, truyện cổ tích ấm áp</p>
            </div>
            <span className="text-textSecondary/40 text-lg font-bold">➔</span>
          </div>

          <div onClick={() => navigateTo('age-hub', { ageGroup: '9-12' })} className="w-full bg-[#FFF9EE] border-2 border-forestGreen/30 hover:border-forestGreen rounded-2xl p-4 flex items-center gap-4 cursor-pointer active:scale-[0.98] transition-all shadow-sm hover:shadow-md">
            <div className="w-12 h-12 rounded-xl bg-forestGreen/10 text-forestGreen flex items-center justify-center text-3xl flex-shrink-0">
              🧑‍🤝‍🧑
            </div>
            <div className="flex-1 min-w-0">
              <span className="text-[9px] font-bold text-forestGreen uppercase tracking-wider bg-forestGreen/10 px-2 py-0.5 rounded">TẦNG 2 • 9–12 TUỔI</span>
              <h3 className="text-sm font-bold text-textPrimary mt-1">Bản Đồ Phiêu Lưu</h3>
              <p className="text-[11px] text-textSecondary font-semibold leading-normal truncate">Khám phá thiên nhiên, thế giới kỳ thú</p>
            </div>
            <span className="text-textSecondary/40 text-lg font-bold">➔</span>
          </div>

          <div onClick={() => navigateTo('age-hub', { ageGroup: '12-15' })} className="w-full bg-[#FFF9EE] border-2 border-decodePurple/30 hover:border-decodePurple rounded-2xl p-4 flex items-center gap-4 cursor-pointer active:scale-[0.98] transition-all shadow-sm hover:shadow-md">
            <div className="w-12 h-12 rounded-xl bg-decodePurple/10 text-decodePurple flex items-center justify-center text-3xl flex-shrink-0">
              🧑‍👩‍
            </div>
            <div className="flex-1 min-w-0">
              <span className="text-[9px] font-bold text-decodePurple uppercase tracking-wider bg-decodePurple/15 px-2 py-0.5 rounded">TẦNG 3 • 12–15 TUỔI</span>
              <h3 className="text-sm font-bold text-textPrimary mt-1">Phòng Giải Mã</h3>
              <p className="text-[11px] text-textSecondary font-semibold leading-normal truncate">Câu chuyện mật mã, sâu sắc & cuốn hút</p>
            </div>
            <span className="text-textSecondary/40 text-lg font-bold">➔</span>
          </div>
        </div>

        <div className="text-center pb-4 select-none animate-fade-in">
          <button onClick={() => navigateTo('home')} className="text-xs font-bold text-textPrimary/80 hover:text-textPrimary bg-textPrimary/5 hover:bg-[#F6C65B]/20 px-5 py-3 rounded-full border border-textPrimary/5 active:scale-95 transition-all">
            ✨ Khám phá toàn bộ thư viện
          </button>
        </div>
      </div>
    );
  };

  // Render Home screen
  const renderHomeScreenView = () => {
    const filteredStories = stories.filter(s => {
      if (!searchQuery) return true;
      return s.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
             s.summary.toLowerCase().includes(searchQuery.toLowerCase());
    });

    const historyStories = [];
    for (const [storyId, pageIdx] of Object.entries(readingProgress)) {
      const story = stories.find(s => s.id === storyId);
      if (story && story.pages && pageIdx < story.pages.length - 1) {
        historyStories.push({ story, pageIdx });
      }
    }

    return (
      <div className="w-full h-full flex flex-col pt-16">
        <div className="flex-1 overflow-y-auto pb-20">
          
          <section className="w-full px-4 py-3.5 mb-1">
            <div className="bg-cardLight border border-textSecondary/5 rounded-2xl p-4 flex items-center justify-between shadow-sm relative overflow-hidden">
              <div className="flex items-center gap-3">
                <span className="text-2xl animate-pulse select-none">✨</span>
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-textPrimary font-outfit tracking-wide">Mở cánh cửa Bảo Bối tối nay</span>
                  <span className="text-[10px] text-textSecondary font-semibold">Truyện tranh tương tác & Audio kể chuyện</span>
                </div>
              </div>
              <button 
                onClick={() => scrollRef.current?.scrollIntoView({ behavior: 'smooth' })} 
                className="bg-textPrimary text-white text-[10px] font-bold px-3 py-2 rounded-xl shadow-sm active:scale-95 transition-transform flex-shrink-0"
              >
                Khám phá
              </button>
            </div>
          </section>

          <section id="age-gates" ref={scrollRef} className="w-full px-4 mb-6 scroll-mt-20">
            <h3 className="text-sm font-bold text-textSecondary uppercase tracking-wider mb-3">Chọn cánh cửa của con</h3>
            <div className="flex gap-3 overflow-x-auto pb-2 scroll-smooth animate-fade-in">
              <div onClick={() => navigateTo('age-hub', { ageGroup: '5-8' })} className="w-[140px] flex-shrink-0 bg-[#FFF9EE] border-2 border-softEarthPink/30 rounded-2xl p-3 text-center cursor-pointer active:scale-95 transition-transform">
                <span className="text-4xl block mb-2">👦👧</span>
                <h4 class="text-xs font-bold text-textPrimary mb-1">Cổ Tích</h4>
                <p className="text-[9px] text-textSecondary font-medium leading-snug mb-2">Tranh lớn, chữ ngắn, truyện cổ tích</p>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-softEarthPink/10 text-softEarthPink">5-8 Tuổi</span>
              </div>
              <div onClick={() => navigateTo('age-hub', { ageGroup: '9-12' })} className="w-[140px] flex-shrink-0 bg-[#FFF9EE] border-2 border-forestGreen/30 rounded-2xl p-3 text-center cursor-pointer active:scale-95 transition-transform">
                <span className="text-4xl block mb-2">🧑‍🤝‍🧑</span>
                <h4 className="text-xs font-bold text-textPrimary mb-1">Phiêu Lưu</h4>
                <p className="text-[9px] text-textSecondary font-medium leading-snug mb-2">Khám phá, lưới bản đồ kỳ thú</p>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-forestGreen/10 text-forestGreen">9-12 Tuổi</span>
              </div>
              <div onClick={() => navigateTo('age-hub', { ageGroup: '12-15' })} className="w-[140px] flex-shrink-0 bg-[#FFF9EE] border-2 border-decodePurple/30 rounded-2xl p-3 text-center cursor-pointer active:scale-95 transition-transform">
                <span className="text-4xl block mb-2">🧑‍🦱👩‍🦱</span>
                <h4 className="text-xs font-bold text-textPrimary mb-1">Giải Mã</h4>
                <p className="text-[9px] text-textSecondary font-medium leading-snug mb-2">Mật mã, sâu sắc, tối giản cuốn hút</p>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-decodePurple/15 text-decodePurple">12-15 Tuổi</span>
              </div>
            </div>
          </section>

          {historyStories.length > 0 && (
            <section className="w-full px-4 mb-5">
              <h3 className="text-sm font-bold text-textSecondary uppercase tracking-wider mb-2">Đọc tiếp truyện đang xem</h3>
              {(() => {
                const recent = historyStories[historyStories.length - 1];
                const pct = Math.round((recent.pageIdx + 1) / recent.story.pages.length * 100);
                return (
                  <div className="bg-cardLight rounded-2xl p-3 border border-textSecondary/10 shadow-sm flex items-center gap-3">
                    <div className="w-14 h-14 bg-gray-200 rounded-xl overflow-hidden flex-shrink-0 flex items-center justify-center">
                      {getStoryCover(recent.story, 'small')}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-bold text-textPrimary truncate">{recent.story.title}</h4>
                      <p className="text-xs text-textSecondary font-medium">Trang {recent.pageIdx + 1}/{recent.story.pages.length} ({pct}%)</p>
                      <div className="w-full h-1.5 bg-textPrimary/5 rounded-full mt-1.5 overflow-hidden">
                        <div className="h-full bg-honeyYellow rounded-full" style={{ width: `${pct}%` }}></div>
                      </div>
                    </div>
                    <button onClick={() => navigateTo('reader', { storyId: recent.story.id })} className="bg-textPrimary text-white text-xs font-bold px-3 py-2 rounded-xl active:scale-95 transition-transform flex-shrink-0">
                      Tiếp tục
                    </button>
                  </div>
                );
              })()}
            </section>
          )}

          {filteredStories.length === 0 ? (
            <div className="px-4 py-12 text-center">
              <span className="text-4xl block mb-2">🔍🌧️</span>
              <p className="text-sm text-textSecondary font-medium">Không tìm thấy truyện Bảo Bối nào. Chị hãy thêm truyện mới ở góc trên bên phải nhé!</p>
            </div>
          ) : (
            <section className="w-full px-4 mb-6">
              <h3 className="text-sm font-bold text-textSecondary uppercase tracking-wider mb-3">Truyện mới có Audio</h3>
              <div className="grid grid-cols-1 gap-4">
                {filteredStories.map(story => (
                  <div key={story.id} onClick={() => navigateTo('detail', { storyId: story.id })} className="bg-cardLight rounded-2xl overflow-hidden border border-textSecondary/10 shadow-sm flex flex-col cursor-pointer active:scale-[0.99] transition-transform">
                    <div className="w-full aspect-[4/3] bg-gray-200 relative overflow-hidden flex items-center justify-center">
                      {getStoryCover(story, 'large')}
                      <span className="absolute top-3 right-3 text-[11px] font-bold bg-textPrimary/70 backdrop-blur-sm text-white px-2 py-0.5 rounded-full">
                        ⏱️ {story.duration}
                      </span>
                    </div>
                    <div className="p-4 flex-1 flex flex-col justify-between">
                      <div>
                        <h4 className="text-[17px] font-bold text-textPrimary leading-snug mb-1">{story.title}</h4>
                        <p className="text-xs text-textSecondary line-clamp-2 font-medium mb-3">{story.summary}</p>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex flex-wrap gap-1">
                          {story.tags.slice(0, 2).map((tag, i) => (
                            <span key={i} className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-textPrimary/5 text-textSecondary">{tag}</span>
                          ))}
                        </div>
                        <button className="bg-[#F6C65B] text-textPrimary text-xs font-bold px-3.5 py-1.5 rounded-full active:scale-95 transition-transform flex items-center gap-1">
                          <span>▶ Đọc & Nghe</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          <section className="w-full px-4 mb-8">
            <div onClick={() => navigateTo('bedtime')} className="bg-nightLibrary rounded-3xl p-5 border border-white/5 shadow-md flex items-center justify-between cursor-pointer active:scale-[0.99] transition-transform relative overflow-hidden">
              <div className="absolute -right-6 -bottom-6 text-6xl opacity-10">🌙</div>
              <div className="max-w-[180px]">
                <span className="text-xs font-bold text-honeyYellow tracking-widest uppercase block mb-1">GIỜ ĐI NGỦ</span>
                <h4 className="text-lg font-bold text-white mb-1">Một câu chuyện ngủ ngon</h4>
                <p className="text-[11px] text-white/60 leading-normal">Kích hoạt chế độ tắt đèn, âm thanh chimes thư giãn và hẹn giờ tự động.</p>
              </div>
              <div className="w-14 h-14 rounded-full bg-honeyYellow/20 flex items-center justify-center text-honeyYellow text-2xl border border-honeyYellow/30 animate-pulse">
                🌙
              </div>
            </div>
          </section>

        </div>
      </div>
    );
  };

  // Render Age Hub screen
  const renderAgeHubScreenView = () => {
    const ageGroup = selectedAgeGroup;
    const groupStories = stories.filter(s => s.ageGroup === ageGroup);

    let headerStyle = '';
    let description = '';
    let themeChipColor = '';

    if (ageGroup === '5-8') {
      headerStyle = 'bg-softEarthPink/10 border-softEarthPink/20 text-softEarthPink';
      description = 'Cánh cửa thần kỳ mở ra những truyện cổ tích rực rỡ sắc màu, chữ to dễ đọc, kết hợp giọng đọc kể chuyện ngọt ngào.';
      themeChipColor = 'bg-softEarthPink text-white';
    } else if (ageGroup === '9-12') {
      headerStyle = 'bg-forestGreen/10 border-forestGreen/20 text-forestGreen';
      description = 'Tấm bản đồ đưa con đến những vùng đất phiêu lưu kỳ thú, khám phá bí ẩn tự nhiên và rèn luyện kỹ năng sống.';
      themeChipColor = 'bg-forestGreen text-white';
    } else {
      headerStyle = 'bg-decodePurple/20 border-decodePurple/30 text-decodePurple';
      description = 'Phòng giải mã dành cho các nhà thám hiểm lớn tuổi hơn. Truyện sâu sắc, mật mã hóc búa, thiết kế tối giản cuốn hút.';
      themeChipColor = 'bg-decodePurple text-white';
    }

    const ageGroupTags = ['👦👧 Ngủ ngon', '🦊 Động vật', '🏡 Gia đình', '🧑‍🤝‍🧑 Phiêu lưu', '🧑‍🦱👩‍🦱 Giải mật mã', '🚀 Khoa học'];

    return (
      <div className="w-full h-full flex flex-col pt-16">
        <div className="flex-1 overflow-y-auto pb-20">
          <div className="px-4 py-4 mb-2">
            <div className={`rounded-2xl p-4 border border-textSecondary/10 ${headerStyle}`}>
              <p className="text-xs font-bold leading-relaxed">{description}</p>
            </div>
          </div>

          <div className="w-full px-4 mb-4">
            <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
              <span className={`px-3.5 py-1.5 rounded-full text-xs font-bold flex-shrink-0 cursor-pointer ${themeChipColor}`}>Tất cả</span>
              {ageGroupTags.map((t, idx) => (
                <span key={idx} className="px-3.5 py-1.5 rounded-full text-xs font-bold bg-cardLight border border-textSecondary/10 text-textSecondary flex-shrink-0 cursor-pointer hover:border-honeyYellow active:scale-95 transition-transform">{t}</span>
              ))}
            </div>
          </div>

          <div className="w-full px-4 mb-4">
            {groupStories.length === 0 ? (
              <div className="px-4 py-8 text-center text-textSecondary">Chưa có truyện mẫu cho nhóm tuổi này. Chị có thể thêm truyện từ mục Admin (⚙️)!</div>
            ) : (
              ageGroup === '5-8' ? (
                groupStories.map(story => (
                  <div key={story.id} onClick={() => navigateTo('detail', { storyId: story.id })} className="bg-cardLight rounded-3xl overflow-hidden border border-textSecondary/10 shadow-sm flex flex-col cursor-pointer active:scale-[0.99] transition-transform mb-4">
                    <div className="w-full aspect-[4/3] bg-gray-200 relative overflow-hidden flex items-center justify-center">
                      {getStoryCover(story, 'large')}
                    </div>
                    <div className="p-5">
                      <h4 className="text-xl font-bold text-textPrimary leading-snug mb-2">{story.title}</h4>
                      <p className="text-sm text-textSecondary font-medium line-clamp-2 leading-relaxed mb-4">{story.summary}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-softEarthPink bg-softEarthPink/10 px-3 py-1 rounded-full">👦👧 Tranh lớn, Chữ to</span>
                        <button className="bg-softEarthPink text-white font-bold text-xs px-4 py-2 rounded-full active:scale-95 transition-all">Vào xem</button>
                      </div>
                    </div>
                  </div>
                ))
              ) : ageGroup === '9-12' ? (
                <div className="grid grid-cols-2 gap-3 mb-4">
                  {groupStories.map(story => (
                    <div key={story.id} onClick={() => navigateTo('detail', { storyId: story.id })} className="bg-cardLight rounded-2xl overflow-hidden border border-textSecondary/10 shadow-sm flex flex-col justify-between cursor-pointer active:scale-95 transition-transform">
                      <div className="w-full aspect-[4/3] bg-gray-200 relative overflow-hidden flex items-center justify-center">
                        {getStoryCover(story, 'medium')}
                      </div>
                      <div className="p-3 flex-1 flex flex-col justify-between">
                        <div>
                          <h4 className="text-sm font-bold text-textPrimary line-clamp-2 mb-1">{story.title}</h4>
                          <span className="text-[10px] text-textSecondary font-semibold">⏱️ {story.duration}</span>
                        </div>
                        <button className="w-full mt-3 bg-forestGreen text-white text-xs font-bold py-1.5 rounded-lg active:scale-95 transition-all">Khám phá</button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                groupStories.map(story => (
                  <div key={story.id} onClick={() => navigateTo('detail', { storyId: story.id })} className="bg-cardLight rounded-2xl border-l-4 border-decodePurple p-4 shadow-sm flex justify-between items-center gap-3 cursor-pointer active:scale-[0.98] transition-transform mb-3">
                    <div className="min-w-0 flex-1">
                      <h4 className="text-base font-bold text-textPrimary mb-1 truncate">{story.title}</h4>
                      <p className="text-xs text-textSecondary line-clamp-1 font-medium">{story.summary}</p>
                      <div className="flex gap-2 mt-2">
                        <span className="text-[10px] font-bold text-decodePurple bg-decodePurple/10 px-2 py-0.5 rounded">12-15 tuổi</span>
                        <span className="text-[10px] font-bold text-textSecondary">{story.duration}</span>
                      </div>
                    </div>
                    <button className="bg-decodePurple text-white text-xs font-bold px-3 py-2 rounded-xl active:scale-95 transition-all flex-shrink-0">
                      Giải mã
                    </button>
                  </div>
                ))
              )
            )}
          </div>
        </div>
      </div>
    );
  };

  // Render Story Detail Screen
  const renderDetailScreenView = () => {
    const story = stories.find(s => s.id === selectedStoryId);
    if (!story) return <div className="p-4 text-center pt-20">Truyện không tồn tại</div>;

    const isFav = favorites.includes(story.id);
    const favIcon = isFav ? '❤️' : '🤍';
    const favText = isFav ? 'Đã thích' : 'Yêu thích';

    return (
      <div className="w-full h-full flex flex-col pt-16">
        <div className="flex-1 overflow-y-auto pb-20">
          <section className="w-full px-4 pt-4 mb-4">
            <div className="w-full aspect-[4/3] bg-gray-200 rounded-2xl overflow-hidden shadow-sm border border-textSecondary/5 flex items-center justify-center">
              {getStoryCover(story, 'large')}
            </div>
          </section>

          <section className="w-full px-5 mb-4">
            <h2 className="text-2xl font-bold text-textPrimary leading-tight mb-2">{story.title}</h2>
            <p className="text-xs font-bold text-textSecondary mb-3">Tác giả: {story.author}</p>
            <div className="flex flex-wrap gap-1.5 mb-4">
              {story.tags.map((tag, idx) => (
                <span key={idx} className="text-[11px] font-bold px-3 py-1 rounded-full bg-textPrimary/5 text-textSecondary">{tag}</span>
              ))}
            </div>
            
            <div className="flex flex-col gap-2.5">
              <button onClick={() => navigateTo('reader', { storyId: story.id })} className="w-full h-13 rounded-2xl bg-honeyYellow text-textPrimary font-bold text-base shadow-md hover:shadow-lg flex items-center justify-center gap-2 active:scale-[0.98] transition-all">
                <span className="text-lg">▶</span> Đọc & Nghe kể chuyện
              </button>
              
              <div className="flex gap-2">
                <button 
                  onClick={() => {
                    navigateTo('reader', { storyId: story.id });
                    // Auto play narrator on startup
                    setTimeout(() => {
                      playNarrator();
                    }, 500);
                  }} 
                  className="flex-1 h-11 rounded-xl border border-textSecondary/30 bg-white text-textPrimary font-semibold text-xs flex items-center justify-center gap-1.5 active:scale-[0.98] transition-all"
                >
                  🎧 Chỉ nghe Audio
                </button>
                <button onClick={() => toggleFavorite(story.id)} className="flex-1 h-11 rounded-xl border border-textSecondary/30 bg-white text-textPrimary font-semibold text-xs flex items-center justify-center gap-1.5 active:scale-[0.98] transition-all">
                  <span>{favIcon}</span> {favText}
                </button>
              </div>
            </div>
          </section>

          <section className="w-full px-5 mb-5">
            <h3 className="text-sm font-bold text-textSecondary uppercase tracking-wider mb-2">Tóm tắt cốt truyện</h3>
            <p className="text-sm text-textPrimary leading-relaxed font-medium bg-cardLight p-4 rounded-2xl border border-textSecondary/10">{story.summary}</p>
          </section>

          <section className="w-full px-5 mb-5">
            <h3 className="text-sm font-bold text-textSecondary uppercase tracking-wider mb-2">Con sẽ khám phá được gì?</h3>
            <div className="bg-cardLight border border-textSecondary/10 rounded-2xl p-4">
              <ul className="space-y-2.5">
                {story.pedagogy.map((item, idx) => (
                  <li key={idx} className="text-xs text-textSecondary font-semibold leading-relaxed flex items-start gap-2">
                    <span className="text-honeyYellow text-sm">💡</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <section className="w-full px-5 mb-8">
            <h3 className="text-sm font-bold text-textSecondary uppercase tracking-wider mb-2">Câu hỏi gợi mở cho Cha Mẹ</h3>
            <div className="space-y-2">
              {story.questions.map((q, idx) => (
                <div key={idx} className="bg-cardLight border border-textSecondary/10 rounded-xl overflow-hidden">
                  <button 
                    onClick={() => {
                      const panel = document.getElementById(`qa-panel-${idx}`);
                      const arrow = document.getElementById(`qa-arrow-${idx}`);
                      if (panel && arrow) {
                        panel.classList.toggle('hidden');
                        arrow.style.transform = panel.classList.contains('hidden') ? 'rotate(0deg)' : 'rotate(180deg)';
                      }
                    }} 
                    className="w-full px-4 py-3 flex items-center justify-between gap-3 text-left font-bold text-textPrimary text-xs focus:outline-none"
                  >
                    <span>{idx + 1}. {q}</span>
                    <span id={`qa-arrow-${idx}`} className="text-textSecondary font-semibold transition-transform duration-200">▼</span>
                  </button>
                  <div id={`qa-panel-${idx}`} className="hidden px-4 pb-3 border-t border-textSecondary/5 pt-2 text-[11px] text-textSecondary font-medium italic">
                    💡 Gợi ý: Hãy lắng nghe chia sẻ ngây ngô của con. Con có thể đưa ra đáp án dựa trên cảm nhận về lòng trắc ẩn hoặc trải nghiệm thực tế hằng ngày của chính mình.
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    );
  };

  // Render Reader screen
  const renderReaderScreenView = () => {
    const { story, currentPage, isPlaying, isTextHidden, selectedVoice, audioProgress, audioTime, audioDuration } = reader;
    if (!story || !story.pages || story.pages.length === 0) return <div className="p-4 text-center">Không tìm thấy dữ liệu trang truyện.</div>;

    const currentPageData = story.pages[currentPage] || { image: '', text: '' };
    const pageNum = currentPage + 1;
    const totalPages = story.pages.length;

    const isDarkReader = story.ageGroup === '12-15';
    const readerBg = isDarkReader ? 'bg-nightLibrary text-white' : 'bg-warmPaper text-textPrimary';
    const cardBg = isDarkReader ? 'bg-[#2A1E3F]/40 border-white/5' : 'bg-cardLight border-textSecondary/10 shadow-sm';
    const textBg = isDarkReader ? 'text-white/90' : 'text-textPrimary';

    return (
      <div className={`w-full h-full flex flex-col justify-between ${readerBg} relative`}>
        <header className={`w-full h-14 min-h-14 px-4 flex justify-between items-center z-10 border-b ${isDarkReader ? 'border-white/5 bg-[#17213A]/90' : 'border-textSecondary/10 bg-cardLight/90'}`}>
          <button onClick={exitReader} className={`w-10 h-10 flex items-center justify-center rounded-full ${isDarkReader ? 'bg-white/10 text-white' : 'bg-textPrimary/5 text-textPrimary'} active:scale-95 transition-transform`}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="w-5 h-5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <div className="text-center">
            <h1 className="text-[13px] font-bold truncate max-w-[150px]">{story.title}</h1>
            <p className="text-[10px] opacity-60 font-semibold">Nhóm tuổi: {story.ageGroup}</p>
          </div>
          <div className={`${isDarkReader ? 'bg-white/10 text-white' : 'bg-honeyYellow/20 text-textPrimary'} text-[12px] font-bold px-3 py-1 rounded-full`}>
            Trang <span>{pageNum}</span>/{totalPages}
          </div>
        </header>

        <div className="w-full h-1.5 bg-black/5 flex px-0.5 gap-1 select-none">
          {Array.from({ length: totalPages }).map((_, i) => {
            const isActive = i <= currentPage;
            const isCurrent = i === currentPage;
            const dotColor = isCurrent ? 'bg-honeyYellow' : (isActive ? (isDarkReader ? 'bg-white' : 'bg-textPrimary') : (isDarkReader ? 'bg-white/20' : 'bg-textPrimary/10'));
            return <div key={i} className={`h-full rounded-full transition-all duration-300 ${dotColor}`} style={{ flex: 1 }}></div>;
          })}
        </div>

        <main className="flex-1 overflow-y-auto pb-28 flex flex-col justify-start relative px-4 pt-3">
          <div className={`w-full aspect-[4/3] ${isDarkReader ? 'bg-black/20' : 'bg-cardLight'} rounded-2xl overflow-hidden border ${isDarkReader ? 'border-white/5' : 'border-textSecondary/5'} shadow-sm relative flex items-center justify-center group mb-4`}>
            {getStoryCover(story, 'large')}
          </div>

          {!isTextHidden && (
            <div className={`rounded-2xl p-5 ${cardBg} transition-all duration-300 relative select-none`}>
              <div className={`absolute -top-3 right-4 flex gap-1 ${isDarkReader ? 'bg-white/10' : 'bg-textPrimary'} text-white rounded-lg p-0.5 text-[10px] font-bold shadow-md z-10`}>
                <button onClick={cycleTextSize} className="px-2.5 py-0.5 bg-honeyYellow text-textPrimary rounded-md">AA+</button>
                <button onClick={() => setReader(prev => ({ ...prev, isTextHidden: true }))} className="px-2 py-0.5 opacity-80">Ẩn Chữ</button>
              </div>
              
              <p className={`font-medium leading-relaxed text-center leading-[1.65] duration-200 font-vietnam ${getTextSizeClass()} ${textBg}`}>
                {currentPageData.text}
              </p>
            </div>
          )}

          {isTextHidden && (
            <div className="w-full flex justify-center mt-2">
              <button onClick={() => setReader(prev => ({ ...prev, isTextHidden: false }))} className="px-4 py-1.5 bg-textPrimary text-white text-[10px] font-bold rounded-full shadow-md">
                Hiện lời kể truyện
              </button>
            </div>
          )}
        </main>

        <footer className="absolute bottom-0 left-0 right-0 h-24 glass-player z-20 flex flex-col justify-between p-3 select-none">
          <div className="flex justify-between items-center gap-2 mb-2 w-full px-1">
            <div className="bg-textPrimary text-white text-[9.5px] font-bold p-0.5 rounded-full flex items-center shadow border border-white/10">
              <button onClick={() => { setReader(prev => ({ ...prev, selectedVoice: 'female' })); localStorage.setItem('bb_selected_voice', 'female'); }} className={`px-2 py-0.5 rounded-full transition-all ${selectedVoice === 'female' ? 'bg-honeyYellow text-textPrimary font-extrabold' : 'opacity-70'}`}>
                👩‍💼 Nữ (Ban Mai)
              </button>
              <button onClick={() => { setReader(prev => ({ ...prev, selectedVoice: 'male' })); localStorage.setItem('bb_selected_voice', 'male'); }} className={`px-2 py-0.5 rounded-full transition-all ${selectedVoice === 'male' ? 'bg-honeyYellow text-textPrimary font-extrabold' : 'opacity-70'}`}>
                👨‍💼 Nam (Lê Minh)
              </button>
            </div>

            <div className="flex gap-2">
              <button onClick={() => setReader(prev => ({ ...prev, isAutoFlip: !prev.isAutoFlip }))} className={`px-2.5 py-1 rounded-lg text-[9px] font-extrabold border ${reader.isAutoFlip ? 'bg-honeyYellow/20 border-honeyYellow text-textPrimary font-black' : 'border-textSecondary/20 text-textSecondary opacity-80'}`}>
                🔄 Tự động lật trang: {reader.isAutoFlip ? 'Bật' : 'Tắt'}
              </button>
            </div>
          </div>

          <div className="w-full flex items-center justify-between gap-2 mb-1 px-1">
            <span className="text-[10px] font-bold text-textSecondary min-w-[32px]">{formatAudioTime(audioTime)}</span>
            <div className="flex-1 h-2 bg-textPrimary/10 rounded-full relative cursor-pointer">
              <div className="absolute top-0 left-0 h-full bg-honeyYellow rounded-full" style={{ width: `${audioProgress}%` }}></div>
              <div className="absolute top-1/2 -translate-y-1/2 w-3.5 h-3.5 bg-textPrimary border-2 border-white rounded-full shadow-md" style={{ left: `calc(${audioProgress}% - 7px)` }}></div>
            </div>
            <span className="text-[10px] font-bold text-textSecondary min-w-[32px] text-right">{formatAudioTime(audioDuration)}</span>
          </div>

          <div className="w-full flex items-center justify-center gap-8">
            <button onClick={prevReaderPage} className="p-2 text-textPrimary active:scale-75 transition-transform" disabled={currentPage === 0}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 19.5L12 12l7.5-7.5" />
              </svg>
            </button>

            <button onClick={toggleReaderAudio} className="w-14 h-14 rounded-full bg-honeyYellow text-textPrimary flex items-center justify-center shadow-md active:scale-95 transition-all border-4 border-white" title="Phát / Tạm dừng">
              {isAudioLoading ? (
                <div className="w-6 h-6 border-3 border-textPrimary border-t-transparent rounded-full animate-spin"></div>
              ) : isPlaying ? (
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-6 h-6">
                  <path fill-rule="evenodd" d="M6.75 5.25a.75.75 0 0 1 .75-.75H9a.75.75 0 0 1 .75.75v13.5a.75.75 0 0 1-.75.75H7.5a.75.75 0 0 1-.75-.75V5.25Zm7.5 0a.75.75 0 0 1 .75-.75h1.5a.75.75 0 0 1 .75.75v13.5a.75.75 0 0 1-.75.75h-1.5a.75.75 0 0 1-.75-.75V5.25Z" clip-rule="evenodd" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-6 h-6 ml-1">
                  <path fill-rule="evenodd" d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z" clip-rule="evenodd" />
                </svg>
              )}
            </button>

            <button onClick={nextReaderPage} className="p-2 text-textPrimary active:scale-75 transition-transform" disabled={currentPage === totalPages - 1}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </button>
          </div>
        </footer>
      </div>
    );
  };

  // Render Bedtime Mode screen
  const renderBedtimeScreenView = () => {
    const currentStory = bedtime.playlist[bedtime.currentStoryIndex];

    return (
      <div className="w-full h-full flex flex-col pt-16 bg-nightLibrary text-white relative">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {Array.from({ length: 25 }).map((_, i) => {
            const w = 1 + Math.random() * 2.5;
            const top = Math.random() * 100;
            const left = Math.random() * 100;
            const delay = Math.random() * 4;
            return <div key={i} className="star" style={{ width: `${w}px`, height: `${w}px`, top: `${top}%`, left: `${left}%`, animationDelay: `${delay}s` }}></div>;
          })}
        </div>

        {!currentStory ? (
          <div className="flex-1 flex flex-col items-center justify-center p-6 text-center text-white/70">
            <span className="text-5xl block mb-2">🔭</span>
            <p className="text-sm font-medium">Không tìm thấy truyện kể ngủ ngon phù hợp.</p>
            <p className="text-xs opacity-60 mt-1">Con hãy đổi bộ lọc hoặc thêm truyện mới.</p>
          </div>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center p-4 z-10 select-none">
            <div className="relative w-52 h-52 flex items-center justify-center mb-6">
              <div className="absolute inset-0 bg-honeyYellow/10 rounded-full blur-xl pulse-breath"></div>
              
              <div className={`absolute inset-0 bg-[#0f172a] rounded-full border-4 border-white/10 shadow-2xl flex items-center justify-center vinyl-rotate ${bedtime.isPlaying ? '' : 'vinyl-paused'}`}>
                <div className="w-48 h-48 rounded-full border border-white/5 flex items-center justify-center">
                  <div className="w-40 h-40 rounded-full border border-white/5 flex items-center justify-center">
                    <div className="w-32 h-32 rounded-full border border-white/5"></div>
                  </div>
                </div>
              </div>
              
              <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-[#17213A] z-10 bg-gray-600 flex items-center justify-center relative shadow-inner">
                {getStoryCover(currentStory, 'medium')}
              </div>
            </div>

            <div className="text-center max-w-[280px]">
              <h3 className="text-lg font-bold text-white leading-snug mb-1 text-glow">{currentStory.title}</h3>
              <p className="text-xs text-white/60 font-semibold mb-6">Giọng kể chuyện ấm áp • {currentStory.duration}</p>
            </div>

            <div className="flex items-center gap-8">
              <button 
                onClick={() => {
                  stopAllAudio();
                  const prevIdx = (bedtime.currentStoryIndex - 1 + bedtime.playlist.length) % bedtime.playlist.length;
                  setBedtime(prev => ({ ...prev, currentStoryIndex: prevIdx }));
                }} 
                className="p-2 text-white/70 active:scale-75 transition-transform" 
                disabled={bedtime.playlist.length <= 1}
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-7 h-7">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M18.75 19.5l-7.5-7.5 7.5-7.5m-6 15L5.25 12l7.5-7.5" />
                </svg>
              </button>

              <button onClick={toggleBedtimePlay} className="w-16 h-16 rounded-full bg-honeyYellow text-textPrimary flex items-center justify-center shadow-lg active:scale-95 transition-transform border-4 border-[#17213A]">
                {bedtime.isPlaying ? (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-6 h-6">
                    <path fill-rule="evenodd" d="M6.75 5.25a.75.75 0 0 1 .75-.75H9a.75.75 0 0 1 .75.75v13.5a.75.75 0 0 1-.75.75H7.5a.75.75 0 0 1-.75-.75V5.25Zm7.5 0a.75.75 0 0 1 .75-.75h1.5a.75.75 0 0 1 .75.75v13.5a.75.75 0 0 1-.75.75h-1.5a.75.75 0 0 1-.75-.75V5.25Z" clip-rule="evenodd" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-6 h-6 ml-1">
                    <path fill-rule="evenodd" d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z" clip-rule="evenodd" />
                  </svg>
                )}
              </button>

              <button 
                onClick={() => {
                  stopAllAudio();
                  const nextIdx = (bedtime.currentStoryIndex + 1) % bedtime.playlist.length;
                  setBedtime(prev => ({ ...prev, currentStoryIndex: nextIdx }));
                }} 
                className="p-2 text-white/70 active:scale-75 transition-transform" 
                disabled={bedtime.playlist.length <= 1}
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-7 h-7">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5" />
                </svg>
              </button>
            </div>
          </div>
        )}

        <div className="px-5 pb-20 pt-4 bg-[#0f172a]/60 border-t border-white/5 z-10 w-full">
          <div className="mb-4">
            <h4 className="text-[10px] font-bold text-white/40 uppercase tracking-wider mb-2">Bộ lọc ngủ ngon</h4>
            <div className="flex gap-2">
              <button onClick={() => setBedtime(prev => ({ ...prev, ageGroup: 'all' }))} className={`flex-1 py-1 rounded-lg text-[10px] font-semibold ${bedtime.ageGroup === 'all' ? 'bg-white/20 text-white' : 'bg-white/5 text-white/60'}`}>Tất cả tuổi</button>
              <button onClick={() => setBedtime(prev => ({ ...prev, ageGroup: '5-8' }))} className={`flex-1 py-1 rounded-lg text-[10px] font-semibold ${bedtime.ageGroup === '5-8' ? 'bg-softEarthPink text-white' : 'bg-white/5 text-white/60'}`}>5-8 tuổi</button>
              <button onClick={() => setBedtime(prev => ({ ...prev, ageGroup: '9-12' }))} className={`flex-1 py-1 rounded-lg text-[10px] font-semibold ${bedtime.ageGroup === '9-12' ? 'bg-forestGreen text-white' : 'bg-white/5 text-white/60'}`}>9-12 tuổi</button>
              <button onClick={() => setBedtime(prev => ({ ...prev, ageGroup: '12-15' }))} className={`flex-1 py-1 rounded-lg text-[10px] font-semibold ${bedtime.ageGroup === '12-15' ? 'bg-decodePurple text-white border border-decodePurple/30' : 'bg-white/5 text-white/60'}`}>12-15 tuổi</button>
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <h4 className="text-[10px] font-bold text-white/40 uppercase tracking-wider">Hẹn giờ tắt máy</h4>
              <span className="text-xs font-bold text-honeyYellow select-none">
                {bedtime.timerSeconds > 0 ? `Dừng sau ${formatAudioTime(bedtime.timerSeconds)}` : 'Chưa bật'}
              </span>
            </div>
            <div className="flex gap-2">
              <button onClick={() => setSleepTimer(600)} className="flex-1 py-1.5 rounded-lg text-[11px] font-bold bg-white/5 text-white/75 hover:bg-white/10 active:scale-95 transition-all">⏱️ 10 Phút</button>
              <button onClick={() => setSleepTimer(1200)} className="flex-1 py-1.5 rounded-lg text-[11px] font-bold bg-white/5 text-white/75 hover:bg-white/10 active:scale-95 transition-all">⏱️ 20 Phút</button>
              <button onClick={() => setSleepTimer(1800)} className="flex-1 py-1.5 rounded-lg text-[11px] font-bold bg-white/5 text-white/75 hover:bg-white/10 active:scale-95 transition-all">⏱️ 30 Phút</button>
              <button onClick={cancelSleepTimer} className="px-2 py-1.5 rounded-lg text-[10px] font-extrabold bg-red-500/20 text-red-400 active:scale-95 transition-all">Xóa</button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Render Library Screen
  const renderLibraryScreenView = () => {
    const favStories = stories.filter(s => favorites.includes(s.id));
    
    return (
      <div className="w-full h-full flex flex-col pt-16">
        <div className="flex-1 overflow-y-auto pb-20 px-4 pt-4">
          <h3 className="text-xs font-bold text-textSecondary uppercase tracking-wider mb-2">Huy hiệu trí thức đã đạt</h3>
          <div className="mb-5">
            {unlockedBadges.length === 0 ? (
              <div className="p-4 border border-dashed border-textSecondary/20 rounded-xl text-center text-[11px] text-textSecondary font-semibold">
                Chưa mở khóa huy hiệu nào. Hãy đọc hết truyện để đạt danh hiệu nhé!
              </div>
            ) : (
              <div className="grid grid-cols-3 gap-3">
                {unlockedBadges.map((b, idx) => (
                  <div key={idx} className="bg-cardLight p-3 rounded-xl border border-honeyYellow text-center shadow-sm">
                    <span className="text-3xl block mb-1">{b.icon}</span>
                    <span className="text-[9px] font-bold text-textPrimary leading-tight block">{b.badge}</span>
                    <span className="text-[8px] text-textSecondary font-bold block mt-1">{b.date}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          <h3 className="text-xs font-bold text-textSecondary uppercase tracking-wider mb-2">Truyện con thích đọc</h3>
          <div>
            {favStories.length === 0 ? (
              <div className="p-6 text-center text-textSecondary text-xs font-semibold">Danh sách yêu thích chưa có truyện nào.</div>
            ) : (
              <div className="grid grid-cols-2 gap-3">
                {favStories.map(story => (
                  <div key={story.id} onClick={() => navigateTo('detail', { storyId: story.id })} className="bg-cardLight rounded-2xl overflow-hidden border border-textSecondary/10 shadow-sm flex flex-col justify-between cursor-pointer active:scale-95 transition-transform">
                    <div className="w-full aspect-[4/3] bg-gray-200 relative overflow-hidden flex items-center justify-center">
                      {getStoryCover(story, 'medium')}
                    </div>
                    <div className="p-3">
                      <h4 className="text-xs font-bold text-textPrimary line-clamp-1 mb-1">{story.title}</h4>
                      <span className="text-[9px] font-semibold text-textSecondary">{story.duration} • {story.ageGroup} tuổi</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  // Render Admin Screen
  const renderAdminScreenView = () => {
    return (
      <div className="w-full h-full flex flex-col pt-16">
        <div className="flex-1 overflow-y-auto pb-20 px-4 pt-4">
          <div className="bg-honeyYellow/15 border border-honeyYellow/30 rounded-xl p-4 mb-5 text-[11px] text-textSecondary font-medium leading-relaxed">
            💡 **Giao diện Admin Bảo Bối**: Chị có thể tự tải truyện lên để mở rộng thư viện của con. Truyện mới thêm sẽ được lưu tạm tại trình duyệt (LocalStorage) và xuất hiện ngoài trang chủ ngay lập tức!
          </div>

          <h3 className="text-xs font-bold text-textSecondary uppercase tracking-wider mb-2.5">Danh sách truyện hiện tại</h3>
          <div className="max-h-52 overflow-y-auto mb-6 border border-textSecondary/10 rounded-2xl p-2 bg-[#FFF9EE]/50 shadow-inner">
            {stories.map(s => {
              const isCustom = !DEFAULT_STORIES.some(df => df.id === s.id);
              return (
                <div key={s.id} className="flex justify-between items-center p-3 rounded-xl bg-cardLight border border-textSecondary/10 mb-2">
                  <div className="min-w-0 flex-1">
                    <h4 className="text-xs font-bold text-textPrimary truncate">{s.title}</h4>
                    <p className="text-[10px] text-textSecondary font-semibold">Độ tuổi: {s.ageGroup} | {s.pages.length} trang</p>
                  </div>
                  <div className="flex items-center gap-1 flex-shrink-0">
                    <button onClick={() => navigateTo('detail', { storyId: s.id })} className="p-1 text-textSecondary hover:text-textPrimary" title="Xem">👁️</button>
                    {isCustom ? (
                      <button onClick={() => deleteCustomStory(s.id)} className="p-1 text-red-500 hover:text-red-700" title="Xóa">🗑️</button>
                    ) : (
                      <span className="text-[9px] font-bold text-textSecondary opacity-50 px-1">Mặc định</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          <h3 className="text-xs font-bold text-textSecondary uppercase tracking-wider mb-2.5">Cấu hình Giọng đọc AI & Tải lên truyện mới</h3>
          
          <div className="bg-[#FFF9EE] p-4 rounded-2xl border border-textSecondary/10 shadow-sm mb-4 space-y-3">
            <h4 className="text-xs font-bold text-textPrimary uppercase tracking-wider">Cấu hình Giọng đọc AI (FPT.AI)</h4>
            <p className="text-[10px] text-textSecondary leading-normal">Bạn có thể tạo tài khoản miễn phí tại <b>console.fpt.ai</b> để lấy API Key. Giọng đọc sẽ được tự động xử lý loại bỏ tất cả dấu câu và sử dụng giọng Hà Nội chuẩn phổ thông giống như con người đọc sách.</p>
            <div className="flex gap-2">
              <input 
                type="password" 
                value={localStorage.getItem('bb_fpt_key') || 'sUsUf2sWEhcLYaLAQYGkVNFjW6XGkMLG'} 
                onChange={(e) => localStorage.setItem('bb_fpt_key', e.target.value)} 
                placeholder="Dán FPT.AI API Key của bạn vào đây" 
                className="flex-1 px-3 py-2 text-xs border border-textSecondary/20 rounded-xl focus:outline-none focus:border-honeyYellow"
              />
              <select 
                value={localStorage.getItem('bb_fpt_voice') || 'banmai'} 
                onChange={(e) => localStorage.setItem('bb_fpt_voice', e.target.value)} 
                className="px-2 py-2 text-xs border border-textSecondary/20 rounded-xl bg-white focus:outline-none focus:border-honeyYellow"
              >
                <option value="banmai">Nữ Hà Nội (Ban Mai)</option>
                <option value="leminh">Nam Hà Nội (Lê Minh)</option>
                <option value="lannhi">Nữ Nam Bộ (Lan Nhi)</option>
                <option value="minhquang">Nam Trung Bộ (Minh Quang)</option>
              </select>
            </div>
          </div>

          <div className="bg-cardLight p-4 rounded-2xl border border-textSecondary/10 shadow-sm space-y-4">
            <div>
              <label className="block text-[11px] font-bold text-textSecondary uppercase mb-1">Tiêu đề truyện</label>
              <input 
                type="text" 
                value={adminForm.title} 
                onChange={(e) => updateAdminField('title', e.target.value)} 
                placeholder="Ví dụ: Chú Cáo Thông Thái" 
                className="w-full px-3 py-2 text-xs border border-textSecondary/20 rounded-xl focus:outline-none focus:border-honeyYellow"
              />
            </div>

            <div className="flex gap-3">
              <div className="flex-1">
                <label className="block text-[11px] font-bold text-textSecondary uppercase mb-1">Nhóm tuổi</label>
                <select 
                  value={adminForm.ageGroup} 
                  onChange={(e) => updateAdminField('ageGroup', e.target.value)} 
                  className="w-full px-2 py-2 text-xs border border-textSecondary/20 rounded-xl bg-white focus:outline-none focus:border-honeyYellow"
                >
                  <option value="5-8">5-8 tuổi</option>
                  <option value="9-12">9-12 tuổi</option>
                  <option value="12-15">12-15 tuổi</option>
                </select>
              </div>
              <div className="flex-1">
                <label className="block text-[11px] font-bold text-textSecondary uppercase mb-1">Thời lượng đọc</label>
                <input 
                  type="text" 
                  value={adminForm.duration} 
                  onChange={(e) => updateAdminField('duration', e.target.value)} 
                  placeholder="5 phút" 
                  className="w-full px-3 py-2 text-xs border border-textSecondary/20 rounded-xl focus:outline-none focus:border-honeyYellow"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-textSecondary uppercase mb-1">Tác giả</label>
              <input 
                type="text" 
                value={adminForm.author} 
                onChange={(e) => updateAdminField('author', e.target.value)} 
                placeholder="Mây Trắng, Gemini..." 
                className="w-full px-3 py-2 text-xs border border-textSecondary/20 rounded-xl focus:outline-none focus:border-honeyYellow"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-textSecondary uppercase mb-1">Tóm tắt ngắn</label>
              <textarea 
                value={adminForm.summary}
                onChange={(e) => updateAdminField('summary', e.target.value)} 
                placeholder="Tóm tắt nội dung hấp dẫn cuốn hút..." 
                rows="2" 
                className="w-full px-3 py-2 text-xs border border-textSecondary/20 rounded-xl focus:outline-none focus:border-honeyYellow"
              />
            </div>

            <div className="border-t border-textSecondary/10 pt-4">
              <div className="flex justify-between items-center mb-2">
                <h4 className="text-xs font-bold text-textPrimary">Danh sách trang truyện</h4>
                <button onClick={addAdminPage} className="text-[10px] font-bold text-honeyYellow bg-textPrimary px-2.5 py-1.5 rounded-lg active:scale-95 transition-all">+ Thêm trang</button>
              </div>

              <div className="space-y-3">
                {adminForm.pages.map((p, idx) => (
                  <div key={idx} className="bg-textPrimary/5 p-3 rounded-xl space-y-2 border border-textSecondary/5">
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] font-bold text-textSecondary">Trang {idx + 1}</span>
                      {adminForm.pages.length > 1 && (
                        <button onClick={() => removeAdminPage(idx)} className="text-[9px] font-bold text-red-500">Xóa</button>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <div className="w-14">
                        <label className="block text-[9px] font-bold text-textSecondary mb-0.5">Icon Tranh</label>
                        <input 
                          type="text" 
                          value={p.imageSvgText || '📖'} 
                          onChange={(e) => updateAdminPage(idx, 'imageSvgText', e.target.value)} 
                          className="w-full text-center px-1 py-1 text-xs border border-textSecondary/20 rounded-lg focus:outline-none"
                        />
                      </div>
                      <div className="flex-1">
                        <label className="block text-[9px] font-bold text-textSecondary mb-0.5">Chữ hiển thị</label>
                        <textarea 
                          value={p.text}
                          onChange={(e) => updateAdminPage(idx, 'text', e.target.value)} 
                          placeholder="Lời kể truyện..." 
                          rows="2" 
                          className="w-full px-2 py-1 text-xs border border-textSecondary/20 rounded-lg focus:outline-none focus:border-honeyYellow"
                        />
                      </div>
                    </div>
                    
                    <div className="flex gap-2 items-center pt-2 border-t border-textPrimary/5">
                      <button onClick={() => generatePageAudio(idx)} id={`btn-gen-audio-${idx}`} className="text-[9px] font-bold bg-[#F6C65B]/20 text-textPrimary px-2.5 py-1.5 rounded-lg active:scale-95 transition-transform flex-shrink-0">
                        🎙️ Tạo Audio AI (Hà Nội)
                      </button>
                      <input 
                        type="text" 
                        value={p.audio || ''} 
                        onChange={(e) => updateAdminPage(idx, 'audio', e.target.value)} 
                        placeholder="Chưa có audio file, click nút bên để tạo" 
                        className="flex-1 px-2 py-1.5 text-[9px] border border-textSecondary/20 rounded-lg bg-white text-textPrimary focus:outline-none"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button onClick={publishNewStory} className="w-full h-11 bg-honeyYellow text-textPrimary font-bold text-xs rounded-xl shadow active:scale-[0.98] transition-all">
              🚀 Lưu & Đăng truyện lên Thư viện
            </button>
          </div>
        </div>
      </div>
    );
  };

  // ================= MAIN RENDER PIPELINE =================
  const isNightTheme = currentScreen === 'bedtime' || (currentScreen === 'reader' && reader.story?.ageGroup === '12-15');
  const containerTheme = isNightTheme ? 'bg-nightLibrary text-white' : 'bg-warmPaper text-textPrimary';

  return (
    <div 
      id="app-container" 
      className={`w-full max-w-[390px] h-screen sm:h-[844px] ${containerTheme} shadow-2xl relative flex flex-col overflow-hidden sm:rounded-[32px] sm:border-8 sm:border-[#1f2430] transition-colors duration-500`}
    >
      {renderHeader()}

      {currentScreen === 'gatekeeper' && renderGatekeeperScreenView()}
      {currentScreen === 'home' && renderHomeScreenView()}
      {currentScreen === 'age-hub' && renderAgeHubScreenView()}
      {currentScreen === 'detail' && renderDetailScreenView()}
      {currentScreen === 'reader' && renderReaderScreenView()}
      {currentScreen === 'bedtime' && renderBedtimeScreenView()}
      {currentScreen === 'library' && renderLibraryScreenView()}
      {currentScreen === 'admin' && renderAdminScreenView()}

      {renderBottomNav()}
    </div>
  );
}
