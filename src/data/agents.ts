import { Agent } from '../store';

export const DIRECTORS: Agent[] = [
  {
    id: 'd1',
    name: '周星星',
    role: 'director',
    title: '搞笑小剧场导演',
    description: '擅长把控喜剧节奏，无厘头玩梗，适合游戏内的整活视频。',
    avatarUrl: 'https://picsum.photos/seed/director1/200/200',
  },
  {
    id: 'd2',
    name: '李安剪',
    role: 'director',
    title: '混剪类短视频导演',
    description: '节奏大师，踩点狂魔，善于用分镜和特效打造燃爆混剪。',
    avatarUrl: 'https://picsum.photos/seed/director2/200/200',
  },
  {
    id: 'd3',
    name: '脑洞王',
    role: 'director',
    title: '创意类视频导演',
    description: '脑洞大开，不拘一格，总能想出让人意想不到的创意。',
    avatarUrl: 'https://picsum.photos/seed/director3/200/200',
  },
  {
    id: 'd4',
    name: '爽剧制片',
    role: 'director',
    title: '真人无脑爽文短剧导演',
    description: '深谙下沉市场心理，剧情跌宕起伏，反转不断。',
    avatarUrl: 'https://picsum.photos/seed/director4/200/200',
  },
  {
    id: 'd5',
    name: '煽情圣手',
    role: 'director',
    title: '公益广告导演',
    description: '主打情绪价值，赚人眼泪，适合弘扬正能量。',
    avatarUrl: 'https://picsum.photos/seed/director5/200/200',
  },
  {
    id: 'd6',
    name: '高级感',
    role: 'director',
    title: 'TVC广告导演',
    description: '追求极致的画面质感和视听体验，适合高品质宣传。',
    avatarUrl: 'https://picsum.photos/seed/director6/200/200',
  }
];

export const TEAM_AGENTS: Agent[] = [
  // Writers
  {
    id: 'w1',
    name: '王二爷',
    role: 'writer',
    title: '历史类编剧',
    description: '精通各种历史典故，能将游戏角色完美代入历史故事。',
    avatarUrl: 'https://picsum.photos/seed/writer1/200/200',
    params: { style: '正剧', length: 180 }
  },
  {
    id: 'w2',
    name: '游戏圈百晓生',
    role: 'writer',
    title: '游戏二创类编剧',
    description: '常年混迹游戏圈，极其了解玩家痛点和热门梗。',
    avatarUrl: 'https://picsum.photos/seed/writer2/200/200',
    params: { gameArea: '开放世界', targetAudience: '核心玩家' }
  },
  {
    id: 'w3',
    name: '玩梗大手子',
    role: 'writer',
    title: '无厘头玩梗搞笑类编剧',
    description: '梗百科全书，一句话一个梗，不笑不要钱。',
    avatarUrl: 'https://picsum.photos/seed/writer3/200/200',
    params: { memeDensity: '高', jokeType: '无厘头' }
  },
  {
    id: 'w4',
    name: '弱智吧吧主',
    role: 'writer',
    title: '弱智吧类编剧',
    description: '逻辑鬼才，经常写出让人看了直呼“好怪哦，再看一眼”的剧本。',
    avatarUrl: 'https://picsum.photos/seed/writer4/200/200',
    params: { iqLevel: 0, weirdness: 'Max' }
  },
  
  // Cinematographers
  {
    id: 'c1',
    name: '虚幻师',
    role: 'cinematographer',
    title: '虚拟运镜大师',
    description: '精通Unity/UE引擎内的摄像机运动，推拉摇移丝滑无比。',
    avatarUrl: 'https://picsum.photos/seed/c1/200/200',
    params: { fov: 90, smooth: true }
  },
  {
    id: 'c2',
    name: '捕捉者',
    role: 'cinematographer',
    title: '实机实拍专家',
    description: '擅长捕捉游戏内最真实的物理和交互瞬间。',
    avatarUrl: 'https://picsum.photos/seed/c2/200/200',
    params: { framerate: 60, resolution: '4K' }
  },

  // Voice Directors
  {
    id: 'v1',
    name: '电子喉',
    role: 'voice',
    title: '搞怪AI配音员',
    description: '各种魔性变音，方言，电音，鬼畜必备。',
    avatarUrl: 'https://picsum.photos/seed/v1/200/200',
    params: { pitch: 1.2, speed: 1.5, voiceType: '魔性' }
  },
  {
    id: 'v2',
    name: '播音腔',
    role: 'voice',
    title: '情感充沛旁白',
    description: '专业影视级配音，情绪饱满，代入感极强。',
    avatarUrl: 'https://picsum.photos/seed/v2/200/200',
    params: { emotion: '激昂', volume: 80 }
  }
];
