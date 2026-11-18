import type { Dictionary } from './types';

export const ja: Dictionary = {
  meta: { title: 'Lucas Oliveira — バックエンドエンジニア', description: 'サンパウロ在住のバックエンドエンジニア。Python、Django、FastAPI、AWSでAIプロダクトを開発しています。世界中のリモートポジションに対応可能です。' },
  ui: { skip: '本文へスキップ', theme: 'カラーテーマを切り替える', language: '言語', top: 'トップへ戻る', current: '現在', problem: '課題', approach: '対応', result: '成果', source: 'ソースコードを見る' },
  nav: { work: '職歴', cases: '事例', services: 'サービス', skills: 'スタック', about: '自己紹介', contact: '連絡先', blog: 'ブログ' },
  hero: {
    role: 'AIプロダクトを開発するバックエンドエンジニア。',
    lead: '4年間、アイデアから本番運用までプロダクトを届けてきました。安全なAPI、クラウドインフラ、チームが信頼できるLLM機能が得意です。サンパウロを拠点に、海外のチームとリモートで働いています。',
    location: 'ブラジル・サンパウロ（UTC−3）',
    availability: '世界中のリモートポジションに対応可能',
    email: '連絡する',
    menu: { title: 'ご連絡方法をお選びください', email: 'メール', whatsapp: 'WhatsAppですぐにメッセージ', call: '30分の面談を予約', linkedin: 'LinkedInでメッセージ' },
    resume: '職務経歴書',
    stackTitle: '毎日使っている技術',
    stack: ['python', 'django', 'fastapi', 'aws', 'docker', 'postgresql', 'graphql', 'llm'],
    card: { role: 'バックエンドエンジニア', location: 'ブラジル・サンパウロ', timezone: 'UTC-3', openTo: 'リモート（世界中）' },
  },
  work: {
    title: '職歴',
    intro: 'スタートアップ、大手コンサルティング会社、そして数件の業務委託。一貫してバックエンド側で働いてきました。',
    jobs: [
      {
        companyId: 'vocal', company: 'Vocal Silence', role: 'バックエンドエンジニア（ミドルレベル）',
        period: '2026年2月 – 現在', current: true,
        highlights: [
          'PythonとDjangoで構築するAIアプリケーションのバックエンドアーキテクチャを主導。',
          'JWTとHMACによるリクエスト署名で保護された、パートナー向けAPIを設計。',
          'バックエンドのテストスイートをゼロから整備し、プルリクエストにLLMによるコードレビューを導入。',
          'AWS（ECS、Lambda、RDS、S3、SES、CloudWatch）でワークロードを運用し、ジュニアエンジニアをメンタリング。',
        ],
        stack: ['python', 'django', 'aws', 'docker', 'pytest', 'llm'],
      },
      {
        companyId: 'accenture', company: 'Accenture', role: 'ソフトウェアエンジニア',
        period: '2025年1月 – 2026年1月',
        highlights: [
          'Fundação Renova/Samarco、TIM、Easy HR向けに、Cloud Functions、GraphQL Webhook、RPA、自動化を提供。',
          'すべての評価サイクルでTop Performanceの評価を獲得。',
        ],
        stack: ['python', 'gcp', 'graphql', 'angular', 'podman'],
      },
      {
        companyId: 'independent', company: '個人事業（フリーランス）', role: '業務委託ソフトウェアエンジニア',
        period: '2023年10月 – 2025年1月 · 1年4か月',
        summary: '3社向けのバックエンド／フルスタック案件を、プロジェクト単位で担当。',
        highlights: [],
        stack: [],
        engagements: [
          {
            companyId: 'vitta', company: 'Vitta Group Franchising', kind: '業務委託（PJ）',
            highlights: [
            'Python（Django）とNode.jsでバックエンドサービスを開発・保守し、社内向けおよび顧客向けシステムのRESTful APIを構築。',
            'PostgreSQLデータベースを設計・運用し、RD Station CRMとテレマーケティングプラットフォームの連携を構築。',
            'Django、React、PostgreSQLでPOSシステムをリードし、NginxとLinux VPSにデプロイ。',
          ],
            stack: ['django', 'react', 'postgresql', 'nginx'],
          },
          {
            companyId: 'indra', company: 'Indra Energia', kind: '業務委託（PJ）',
            highlights: [
            'エネルギー取引・小売システム向けのバックエンドサービスを開発。',
            '非同期処理とキャッシュでFastAPIサービスを最適化し、応答時間を約30%短縮。',
            'レガシーなサービスをDockerへ移行し、環境関連の問題を約40%、デプロイ後のインシデントを約20%削減。',
          ],
            stack: ['python', 'fastapi', 'docker'],
          },
          {
            companyId: 'mont', company: 'Mont Capital Asset', kind: '案件単位（CLT）',
            highlights: [
            'OpenAI APIを使ったAIサポートアシスタントを設計し、サポート効率を約30〜40%向上。',
            'SOAP/RESTで金融データプロバイダーを統合し、WebSocketでリアルタイム機能を実装。',
            'DockerでAWS（EC2、S3、RDS）にデプロイし、アジャイルチームで10件以上のバックエンド機能を提供。',
          ],
            stack: ['python', 'llm', 'websockets', 'aws'],
          },
        ],
      },
      {
        companyId: 'riobranco', company: 'Colégio Rio Branco', role: 'ITアナリスト／自動化開発者', kind: 'インターン',
        period: '2022年3月 – 2023年10月',
        highlights: [
          'PythonとPowerShellのスクリプトでPCのインストール・設定・管理を自動化し、セットアップ時間を1時間超から15分以下に短縮。',
          'ユーザーサポートと日常のIT業務を担当：システム保守、メール、プリンター、ネットワーク、MySQLデータベース（Linux、Windows、macOS）。',
        ],
        stack: ['python', 'git'],
      },
    ],
  },
  cases: {
    title: '事例',
    intro: '4つの課題と、私の対応、そして変わったこと。',
    items: [
      {
        companyId: 'indra', company: 'Indra Energia', title: '全面的な書き直しなしでAPIを高速化',
        result: { value: '−30%', label: 'APIの応答時間' },
        problem: '応答の遅さと不安定な環境が、リリースの足かせになっていました。',
        approach: 'ホットパスを非同期FastAPIに移行し、キャッシュを追加し、すべての環境をDockerで標準化。セットアップの問題は40%、デプロイ後のインシデントは20%減少しました。',
        stack: ['fastapi', 'python', 'docker'],
      },
      {
        companyId: 'mont', company: 'Mont Capital Asset', title: 'サポートチームのためのAIアシスタント',
        result: { value: '+30–40%', label: 'サポート効率' },
        problem: 'サポートチームが、繰り返し届く金融の質問に何時間も費やしていました。',
        approach: '金融データ（SOAP/REST、WebSocket）の上にOpenAIアシスタントを構築し、AWSでのデプロイ時間を30%短縮しました。',
        stack: ['llm', 'websockets', 'aws'],
      },
      {
        companyId: 'vocal', company: 'Vocal Silence', title: 'パートナーが信頼できるAPI',
        result: { value: '−50%', label: 'Dockerイメージのサイズ' },
        problem: 'パートナーには安全なアクセスが必要でしたが、コードベースにはセーフティネットがありませんでした。',
        approach: 'すべてのリクエストをJWTとHMACで署名し、テストをゼロから書き、LLMによるPRレビューを導入し、AWSにデプロイするイメージを軽量化しました。',
        stack: ['django', 'jwt', 'pytest', 'aws'],
      },
      {
        companyId: 'vitta', company: 'Vitta Group', title: 'ゼロから作ったPOSシステム',
        result: { value: '0 → 1', label: '本番稼働' },
        problem: '事業には、CRMとも連携する独自のPOSが必要でした。',
        approach: 'Django、React、PostgreSQLで設計から納品までをリードし、RD Stationを連携してNginxで公開しました。',
        stack: ['django', 'react', 'postgresql', 'nginx'],
      },
    ],
  },
  blog: {
    title: 'ブログ',
    intro: 'バックエンド開発（Python、Django、API、クラウド）に関するノート。',
    empty: '最初の記事を準備中です。',
    minRead: '読了目安 {n}分',
    back: '記事一覧',
    englishOnly: '記事は英語で書かれています。',
    alsoIn: '{language}でも読めます',
    feed: 'RSSフィード',
    latest: '最新の記事',
    latestIntro: 'バックエンド開発に関する技術記事。',
    all: '記事一覧',
  },
  recommendations: {
    title: '同僚からの声',
    intro: 'LinkedInの推薦文を、ポルトガル語から翻訳したものです。',
    viewAll: 'LinkedInで全文を読む',
    items: [
      { name: 'Odival Neto', headline: 'シニアソフトウェアエンジニア · Python、Swift、API、クラウド', relation: '同じチーム · 2026年1月', quote: '同じソフトウェア開発チームで、難易度の高いプロジェクトにともに取り組む機会に恵まれました。さまざまなソリューションにおいて、確かな技術力を発揮していました。' },
      { name: 'André Garcia Carmona', headline: 'Python、SQL、ETL、AWS、GCP · データサイエンス', relation: '同じチーム · 2025年6月', quote: 'Lucasとは複数のソフトウェア開発プロジェクトでご一緒し、彼が非常に優れたプロフェッショナルであると断言できます。深い技術的知識を持ち、課題に対して常に効率的で革新的な解決策を探します。技術力に加えて、協調性とチームで働く力にも秀でています。' },
      { name: 'Agamenon Sousa Pereira', headline: 'エネルギー経営・経済学MBA', relation: 'Indra Energia（別チーム） · 2025年6月', quote: 'Indra Energiaで、連携したプロジェクトを通じてソフトウェア開発をともに行いました。Lucasは自分の責任に誠実で、周囲をまとめる力に優れています。どのチームに加わっても、きっと力になる人です。' },
      { name: 'Caique Rocha', headline: 'ソフトウェアエンジニア · Python、JavaScript、API、AI', relation: 'Colégio Rio Branco の同じチーム · 2025年6月', quote: 'Colégio Rio BrancoのITチームで、ITアナリストとして働くLucasとご一緒しました。ともに働いた期間を通じて、深い技術的知識と、成果物の品質と効率への強い責任感を示してくれました。' },
    ],
  },
  services: {
    title: 'お手伝いできること',
    intro: 'まずはバックエンド。必要に応じて、プロジェクトを最初から最後まで担当できます。',
    items: [
      { title: 'APIとバックエンド', description: 'チームやパートナーが頼れる安全なAPI。認証、連携、テストを最初から備えます。', stack: ['python', 'django', 'fastapi', 'graphql', 'jwt', 'postgresql'] },
      { title: 'クラウドとデプロイ', description: 'AWSまたはGCP上で動くコンテナ化されたサービス。ノートPCから本番まで、一貫した環境を保ちます。', stack: ['aws', 'gcp', 'docker', 'nginx'] },
      { title: 'AI機能', description: 'お客様のデータとシステムの上に構築する、LLMを活用したアシスタントとワークフロー。', stack: ['llm', 'python'] },
      { title: '自動化', description: '人の繰り返し作業を減らす、スクリプト、Webhook、システム連携。', stack: ['python', 'graphql', 'git'] },
      {
        title: 'プラットフォームを最初から最後まで',
        description: '一人がプロダクト全体を担当するのが適している場合に、Reactのフロントエンド、バックエンド、データベース、デプロイ、連携まで対応します。POSシステムを最初のコミットから本番稼働までリードした経験があります。',
        stack: ['react', 'django', 'postgresql', 'docker', 'nginx'],
        featured: true,
      },
    ],
  },
  skills: {
    title: 'スタック',
    groups: [
      { name: 'バックエンド', items: ['python', 'django', 'fastapi', 'graphql', 'postgresql', 'websockets'] },
      { name: 'クラウドとインフラ', items: ['aws', 'gcp', 'docker', 'podman', 'nginx'] },
      { name: 'AIと品質', items: ['llm', 'pytest', 'jwt', 'git'] },
      { name: 'フロントエンド（必要なとき）', items: ['react', 'angular'] },
    ],
  },
  about: {
    title: '自己紹介',
    paragraphs: [
      '漠然としたプロダクトのアイデアを、安定して動き続けるサービスに変えるのが好きです。得意分野はPython、クラウドインフラ、言語モデルを使った機能です。',
      'クリーンな設計、テスト、セキュリティ、可観測性を大切にし、トレードオフをチームメイトやステークホルダーにわかりやすく説明することを心がけています。',
      '海外のチームとリモートで働いており、条件が合えば移住も歓迎します。',
    ],
    github: { heatmap: '過去1年間のコントリビューション', heatmapDay: '{date}：{count}件のコントリビューション', title: 'GitHub', repos: '公開リポジトリ', stars: 'スター', languages: 'よく使う言語', lastPush: '最終プッシュ', profile: 'プロフィールを見る' },
    languagesTitle: '言語',
    languages: [
      { flag: 'br', name: 'ポルトガル語', level: 'ネイティブ', score: 5 },
      { flag: 'us', name: '英語', level: '上級 · B2/C1', score: 4 },
      { flag: 'jp', name: '日本語', level: '中級 · N3', score: 3 },
      { flag: 'es', name: 'スペイン語', level: '初級', score: 1 },
    ],
    facts: [
      { term: '学歴', value: 'コンピュータサイエンス学士、Estácio' },
    ],
  },
  contact: {
    title: 'お話ししましょう',
    intro: 'USD、EUR、GBPで支払われる、リモートのバックエンドおよびAIプロダクトのポジションに関心があります。通常1日以内に返信します。',
    whatsapp: 'WhatsAppでメッセージ',
    call: '30分の面談を予約',
    resume: '職務経歴書',
  },
  cv: { back: 'サイトに戻る', download: 'PDFをダウンロード', print: '印刷', summary: '概要', experience: '職歴', skills: 'スキル', education: '学歴', languages: '言語' },
};
