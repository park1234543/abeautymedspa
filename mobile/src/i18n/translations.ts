export type Language = 'ko' | 'en' | 'es' | 'zh';

export const LANGUAGE_NAMES: Record<Language, string> = {
  ko: '한국어',
  en: 'English',
  es: 'Español',
  zh: '中文',
};

export const LANGUAGE_FLAGS: Record<Language, string> = {
  ko: '🇰🇷',
  en: '🇺🇸',
  es: '🇪🇸',
  zh: '🇨🇳',
};

const translations = {
  /* ─── WELCOME ─── */
  welcome: {
    tagline: {
      ko: '✦  프리미엄 에스테틱 경험',
      en: '✦  Premium Aesthetic Experience',
      es: '✦  Experiencia Estética Premium',
      zh: '✦  顶级美容体验',
    },
    headline1: {
      ko: '당신의 아름다움을',
      en: 'Elevate Your',
      es: 'Eleva Tu',
      zh: '提升您的',
    },
    headline2: {
      ko: '빛나게 합니다',
      en: 'Natural Beauty',
      es: 'Belleza Natural',
      zh: '自然之美',
    },
    description: {
      ko: '전문 의료진과 첨단 시술로\n당신의 변화가 시작됩니다.',
      en: 'Advanced treatments by board-certified\nspecialists. Your transformation starts here.',
      es: 'Tratamientos avanzados por especialistas\ncertificados. Tu transformación empieza aquí.',
      zh: '由认证专家提供先进治疗\n您的蜕变从这里开始。',
    },
    signIn: {
      ko: '로그인',
      en: 'Sign In',
      es: 'Iniciar Sesión',
      zh: '登录',
    },
    createAccount: {
      ko: '회원가입',
      en: 'Create Account',
      es: 'Crear Cuenta',
      zh: '注册账号',
    },
    terms: {
      ko: '계속하면 이용약관 및 개인정보처리방침에 동의하는 것으로 간주됩니다',
      en: 'By continuing, you agree to our Terms & Privacy Policy',
      es: 'Al continuar, aceptas nuestros Términos y Política de Privacidad',
      zh: '继续即表示您同意我们的条款和隐私政策',
    },
  },

  /* ─── LOGIN ─── */
  login: {
    title: {
      ko: '로그인',
      en: 'Sign In',
      es: 'Iniciar Sesión',
      zh: '登录',
    },
    subtitle: {
      ko: '계정에 로그인하고 예약을 관리하세요',
      en: 'Sign in to manage your appointments',
      es: 'Inicia sesión para gestionar tus citas',
      zh: '登录以管理您的预约',
    },
    demo: {
      ko: '⚡ 데모 로그인 (바로 체험하기)',
      en: '⚡ Demo Login (Try Now)',
      es: '⚡ Inicio Demo (Probar Ahora)',
      zh: '⚡ 体验账号（立即试用）',
    },
    google: {
      ko: 'Google로 계속하기',
      en: 'Continue with Google',
      es: 'Continuar con Google',
      zh: '使用 Google 登录',
    },
    orEmail: {
      ko: '또는 이메일로',
      en: 'or with email',
      es: 'o con correo electrónico',
      zh: '或使用邮箱',
    },
    email: {
      ko: '이메일',
      en: 'Email',
      es: 'Correo electrónico',
      zh: '邮箱',
    },
    emailPlaceholder: {
      ko: '이메일을 입력하세요',
      en: 'Enter your email',
      es: 'Introduce tu correo',
      zh: '请输入邮箱',
    },
    password: {
      ko: '비밀번호',
      en: 'Password',
      es: 'Contraseña',
      zh: '密码',
    },
    passwordPlaceholder: {
      ko: '비밀번호를 입력하세요',
      en: 'Enter your password',
      es: 'Introduce tu contraseña',
      zh: '请输入密码',
    },
    loginBtn: {
      ko: '로그인',
      en: 'Sign In',
      es: 'Iniciar Sesión',
      zh: '登录',
    },
    noAccount: {
      ko: '계정이 없으신가요? ',
      en: "Don't have an account? ",
      es: '¿No tienes cuenta? ',
      zh: '没有账号？',
    },
    register: {
      ko: '회원가입',
      en: 'Register',
      es: 'Registrarse',
      zh: '注册',
    },
    errorRequired: {
      ko: '이메일과 비밀번호를 입력해주세요.',
      en: 'Please enter email and password.',
      es: 'Por favor ingresa email y contraseña.',
      zh: '请输入邮箱和密码。',
    },
    errorInvalid: {
      ko: '이메일 또는 비밀번호를 확인해주세요.',
      en: 'Invalid email or password.',
      es: 'Email o contraseña incorrectos.',
      zh: '邮箱或密码不正确。',
    },
  },

  /* ─── REGISTER ─── */
  register: {
    title: {
      ko: '회원가입',
      en: 'Create Account',
      es: 'Crear Cuenta',
      zh: '注册账号',
    },
    subtitle: {
      ko: '새 계정을 만들고 특별한 혜택을 받으세요',
      en: 'Create an account and enjoy exclusive benefits',
      es: 'Crea tu cuenta y disfruta de beneficios exclusivos',
      zh: '注册账号，享受专属优惠',
    },
    name: { ko: '이름 *', en: 'Name *', es: 'Nombre *', zh: '姓名 *' },
    namePlaceholder: { ko: '이름을 입력하세요', en: 'Enter your name', es: 'Introduce tu nombre', zh: '请输入姓名' },
    phone: { ko: '전화번호', en: 'Phone', es: 'Teléfono', zh: '手机号' },
    phonePlaceholder: { ko: '전화번호를 입력하세요', en: 'Enter your phone', es: 'Introduce tu teléfono', zh: '请输入手机号' },
    password: { ko: '비밀번호 *', en: 'Password *', es: 'Contraseña *', zh: '密码 *' },
    passwordPlaceholder: { ko: '비밀번호 (8자 이상)', en: 'Password (min 8 chars)', es: 'Contraseña (mín. 8 caracteres)', zh: '密码（至少8位）' },
    confirmPassword: { ko: '비밀번호 확인 *', en: 'Confirm Password *', es: 'Confirmar Contraseña *', zh: '确认密码 *' },
    confirmPlaceholder: { ko: '비밀번호를 다시 입력하세요', en: 'Re-enter your password', es: 'Vuelve a introducir tu contraseña', zh: '请再次输入密码' },
    registerBtn: { ko: '회원가입', en: 'Create Account', es: 'Crear Cuenta', zh: '注册' },
    hasAccount: { ko: '이미 계정이 있으신가요? ', en: 'Already have an account? ', es: '¿Ya tienes cuenta? ', zh: '已有账号？' },
    signIn: { ko: '로그인', en: 'Sign In', es: 'Iniciar Sesión', zh: '登录' },
    alertTitle: { ko: '알림', en: 'Notice', es: 'Aviso', zh: '提示' },
    errorRequired: { ko: '모든 필수 항목을 입력해주세요.', en: 'Please fill all required fields.', es: 'Por favor completa todos los campos requeridos.', zh: '请填写所有必填项。' },
    errorPasswordMatch: { ko: '비밀번호가 일치하지 않습니다.', en: 'Passwords do not match.', es: 'Las contraseñas no coinciden.', zh: '两次密码不一致。' },
    errorPasswordLength: { ko: '비밀번호는 8자 이상이어야 합니다.', en: 'Password must be at least 8 characters.', es: 'La contraseña debe tener al menos 8 caracteres.', zh: '密码至少需要8位。' },
    errorFailed: { ko: '다시 시도해주세요.', en: 'Please try again.', es: 'Por favor inténtalo de nuevo.', zh: '请重试。' },
    failTitle: { ko: '회원가입 실패', en: 'Registration Failed', es: 'Error de registro', zh: '注册失败' },
  },

  /* ─── TABS ─── */
  tabs: {
    home: { ko: '홈', en: 'Home', es: 'Inicio', zh: '首页' },
    services: { ko: '서비스', en: 'Services', es: 'Servicios', zh: '服务' },
    gallery: { ko: '갤러리', en: 'Gallery', es: 'Galería', zh: '图库' },
    profile: { ko: '프로필', en: 'Profile', es: 'Perfil', zh: '我的' },
  },

  /* ─── HOME ─── */
  home: {
    premiumAesthetic: { ko: 'PREMIUM AESTHETIC', en: 'PREMIUM AESTHETIC', es: 'ESTÉTICA PREMIUM', zh: '顶级美容' },
    headline1: { ko: '당신의 아름다움을', en: 'Elevate Your', es: 'Eleva Tu', zh: '提升您的' },
    headline2: { ko: '빛나게 합니다', en: 'Natural Beauty', es: 'Belleza Natural', zh: '自然之美' },
    heroDesc: { ko: 'board-certified specialists · advanced treatments', en: 'board-certified specialists · advanced treatments', es: 'especialistas certificados · tratamientos avanzados', zh: '认证专家 · 先进治疗' },
    bookNow: { ko: '예약하기', en: 'Book Now', es: 'Reservar', zh: '立即预约' },
    customers: { ko: '고객', en: 'Clients', es: 'Clientes', zh: '客户' },
    rating: { ko: '평점', en: 'Rating', es: 'Calificación', zh: '评分' },
    experience: { ko: '경력', en: 'Years', es: 'Años', zh: '经验' },
    quickBook: { ko: '예약', en: 'Book', es: 'Reserva', zh: '预约' },
    quickCall: { ko: '전화', en: 'Call', es: 'Llamar', zh: '电话' },
    quickLocation: { ko: '위치', en: 'Location', es: 'Ubicación', zh: '位置' },
    quickConsult: { ko: '상담', en: 'Consult', es: 'Consulta', zh: '咨询' },
    ourTreatments: { ko: 'OUR TREATMENTS', en: 'OUR TREATMENTS', es: 'NUESTROS TRATAMIENTOS', zh: '我们的服务' },
    popularServices: { ko: '인기 서비스', en: 'Popular Services', es: 'Servicios Populares', zh: '热门服务' },
    viewAll: { ko: '전체보기', en: 'View All', es: 'Ver Todo', zh: '查看全部' },
    meetExperts: { ko: 'MEET THE EXPERTS', en: 'MEET THE EXPERTS', es: 'CONOCE A LOS EXPERTOS', zh: '认识专家团队' },
    ourDoctors: { ko: '전문 의료진', en: 'Our Specialists', es: 'Nuestros Especialistas', zh: '专业医师' },
    career: { ko: '경력', en: 'exp.', es: 'exp.', zh: '经验' },
    aboutUs: { ko: 'ABOUT US', en: 'ABOUT US', es: 'SOBRE NOSOTROS', zh: '关于我们' },
    aboutTitle: { ko: 'A Beauty MedSpa', en: 'A Beauty MedSpa', es: 'A Beauty MedSpa', zh: 'A Beauty MedSpa' },
    aboutDesc: {
      ko: '최첨단 의료 장비와 풍부한 경험의 전문 의료진이 함께하는\n프리미엄 메디스파입니다.',
      en: 'A premium med spa combining state-of-the-art\nequipment with experienced specialists.',
      es: 'Un med spa premium que combina equipos de vanguardia\ncon especialistas experimentados.',
      zh: '汇聚尖端医疗设备与经验丰富专家团队\n的顶级医疗美容中心。',
    },
    yearsExp: { ko: '년 경력', en: 'Years', es: 'Años', zh: '年经验' },
    ctaBtn: { ko: '무료 상담 예약하기', en: 'Book Free Consultation', es: 'Reservar Consulta Gratuita', zh: '免费预约咨询' },
    ctaSub: { ko: '전문 상담원이 친절히 안내해 드립니다', en: 'Our specialists are ready to guide you', es: 'Nuestros especialistas están listos para guiarte', zh: '我们的专家随时为您提供专业指导' },
  },

  /* ─── SERVICES ─── */
  services: {
    title: { ko: '서비스', en: 'Services', es: 'Servicios', zh: '服务' },
    subtitle: { ko: '프리미엄 메디스파 서비스를 경험하세요', en: 'Experience our premium med spa services', es: 'Experimenta nuestros servicios premium de med spa', zh: '体验我们的顶级医疗美容服务' },
    all: { ko: '전체', en: 'All', es: 'Todo', zh: '全部' },
    face: { ko: '얼굴', en: 'Face', es: 'Cara', zh: '面部' },
    body: { ko: '바디', en: 'Body', es: 'Cuerpo', zh: '身体' },
    skin: { ko: '피부', en: 'Skin', es: 'Piel', zh: '皮肤' },
    bookNow: { ko: '예약하기', en: 'Book Now', es: 'Reservar', zh: '立即预约' },
    min: { ko: '분', en: 'min', es: 'min', zh: '分钟' },
  },

  /* ─── GALLERY ─── */
  gallery: {
    title: { ko: '갤러리', en: 'Gallery', es: 'Galería', zh: '图库' },
    subtitle: { ko: '시술 전후 사진과 클리닉 사진', en: 'Before & after photos and clinic images', es: 'Fotos de antes y después e imágenes de la clínica', zh: '治疗前后对比及诊所照片' },
    all: { ko: '전체', en: 'All', es: 'Todo', zh: '全部' },
    botox: { ko: '보톡스', en: 'Botox', es: 'Bótox', zh: '肉毒素' },
    filler: { ko: '필러', en: 'Filler', es: 'Relleno', zh: '填充剂' },
    laser: { ko: '레이저', en: 'Laser', es: 'Láser', zh: '激光' },
    skincare: { ko: '스킨케어', en: 'Skincare', es: 'Cuidado de la piel', zh: '护肤' },
  },

  /* ─── PROFILE ─── */
  profile: {
    editProfile: { ko: '프로필 편집', en: 'Edit Profile', es: 'Editar Perfil', zh: '编辑资料' },
    upcomingBookings: { ko: '예정 예약', en: 'Upcoming', es: 'Próximas', zh: '待预约' },
    completedTreatments: { ko: '시술 완료', en: 'Completed', es: 'Completados', zh: '已完成' },
    totalSpent: { ko: '누적 금액', en: 'Total Spent', es: 'Total Gastado', zh: '累计消费' },
    bookNew: { ko: '새 예약 하기', en: 'Book New Appointment', es: 'Nueva Reserva', zh: '新增预约' },
    bookNewSub: { ko: '프리미엄 시술을 지금 예약하세요', en: 'Book a premium treatment now', es: 'Reserva un tratamiento premium ahora', zh: '立即预约顶级治疗' },
    myInfo: { ko: '내 정보', en: 'My Info', es: 'Mi Información', zh: '我的信息' },
    myBookings: { ko: '내 예약', en: 'My Bookings', es: 'Mis Reservas', zh: '我的预约' },
    bookingsCount: { ko: '예정 {n}건', en: '{n} upcoming', es: '{n} próximas', zh: '{n} 个待预约' },
    history: { ko: '시술 기록', en: 'Treatment History', es: 'Historial de Tratamientos', zh: '治疗记录' },
    historyCount: { ko: '완료 {n}건', en: '{n} completed', es: '{n} completados', zh: '{n} 个已完成' },
    favorites: { ko: '찜한 서비스', en: 'Saved Services', es: 'Servicios Guardados', zh: '收藏服务' },
    favoritesSub: { ko: '관심 서비스 목록', en: 'Your saved list', es: 'Tu lista guardada', zh: '您的收藏列表' },
    points: { ko: '포인트', en: 'Points', es: 'Puntos', zh: '积分' },
    pointsSub: { ko: '적립 포인트 및 쿠폰', en: 'Points & coupons', es: 'Puntos y cupones', zh: '积分和优惠券' },
    settings: { ko: '설정', en: 'Settings', es: 'Configuración', zh: '设置' },
    notifications: { ko: '알림 설정', en: 'Notifications', es: 'Notificaciones', zh: '通知设置' },
    language: { ko: '언어 설정', en: 'Language', es: 'Idioma', zh: '语言' },
    privacy: { ko: '개인정보 처리방침', en: 'Privacy Policy', es: 'Política de Privacidad', zh: '隐私政策' },
    terms: { ko: '이용약관', en: 'Terms of Service', es: 'Términos de Servicio', zh: '服务条款' },
    help: { ko: '고객센터', en: 'Help & Support', es: 'Ayuda y Soporte', zh: '帮助与支持' },
    logout: { ko: '로그아웃', en: 'Sign Out', es: 'Cerrar Sesión', zh: '退出登录' },
    logoutTitle: { ko: '로그아웃', en: 'Sign Out', es: 'Cerrar Sesión', zh: '退出登录' },
    logoutMsg: { ko: '정말 로그아웃 하시겠습니까?', en: 'Are you sure you want to sign out?', es: '¿Estás seguro de que deseas cerrar sesión?', zh: '您确定要退出登录吗？' },
    cancel: { ko: '취소', en: 'Cancel', es: 'Cancelar', zh: '取消' },
    version: { ko: '버전', en: 'Version', es: 'Versión', zh: '版本' },
    selectLanguage: { ko: '언어 선택', en: 'Select Language', es: 'Seleccionar Idioma', zh: '选择语言' },
  },

  /* ─── BOOKING ─── */
  booking: {
    steps: {
      ko: ['서비스', '의사', '날짜/시간', '정보', '확인'],
      en: ['Service', 'Doctor', 'Date/Time', 'Info', 'Confirm'],
      es: ['Servicio', 'Doctor', 'Fecha/Hora', 'Info', 'Confirmar'],
      zh: ['服务', '医生', '日期/时间', '信息', '确认'],
    },
    selectService: { ko: '서비스를 선택하세요', en: 'Select a service', es: 'Selecciona un servicio', zh: '请选择服务' },
    selectDoctor: { ko: '담당 의사를 선택하세요', en: 'Select a doctor', es: 'Selecciona un médico', zh: '请选择医生' },
    selectDate: { ko: '날짜를 선택하세요', en: 'Select a date', es: 'Selecciona una fecha', zh: '请选择日期' },
    selectTime: { ko: '시간을 선택하세요', en: 'Select a time', es: 'Selecciona una hora', zh: '请选择时间' },
    enterInfo: { ko: '예약자 정보를 입력하세요', en: 'Enter your information', es: 'Introduce tu información', zh: '请输入预约信息' },
    confirmBooking: { ko: '예약 정보를 확인하세요', en: 'Confirm your booking', es: 'Confirma tu reserva', zh: '确认预约信息' },
    name: { ko: '이름 *', en: 'Name *', es: 'Nombre *', zh: '姓名 *' },
    namePlaceholder: { ko: '이름을 입력하세요', en: 'Enter your name', es: 'Introduce tu nombre', zh: '请输入姓名' },
    email: { ko: '이메일 *', en: 'Email *', es: 'Correo *', zh: '邮箱 *' },
    emailPlaceholder: { ko: '이메일을 입력하세요', en: 'Enter your email', es: 'Introduce tu correo', zh: '请输入邮箱' },
    phone: { ko: '전화번호 *', en: 'Phone *', es: 'Teléfono *', zh: '手机号 *' },
    phonePlaceholder: { ko: '전화번호를 입력하세요', en: 'Enter your phone', es: 'Introduce tu teléfono', zh: '请输入手机号' },
    notes: { ko: '요청 사항', en: 'Special Requests', es: 'Solicitudes Especiales', zh: '特殊要求' },
    notesPlaceholder: { ko: '특별 요청 사항이 있으면 입력하세요', en: 'Any special requests?', es: '¿Alguna solicitud especial?', zh: '有特殊要求请说明' },
    service: { ko: '서비스', en: 'Service', es: 'Servicio', zh: '服务' },
    doctor: { ko: '담당 의사', en: 'Doctor', es: 'Médico', zh: '医生' },
    date: { ko: '날짜', en: 'Date', es: 'Fecha', zh: '日期' },
    time: { ko: '시간', en: 'Time', es: 'Hora', zh: '时间' },
    customer: { ko: '예약자', en: 'Customer', es: 'Cliente', zh: '预约人' },
    contact: { ko: '연락처', en: 'Contact', es: 'Contacto', zh: '联系方式' },
    total: { ko: '총 금액', en: 'Total', es: 'Total', zh: '总金额' },
    prev: { ko: '이전', en: 'Back', es: 'Atrás', zh: '上一步' },
    next: { ko: '다음', en: 'Next', es: 'Siguiente', zh: '下一步' },
    confirm: { ko: '예약 완료', en: 'Confirm Booking', es: 'Confirmar Reserva', zh: '确认预约' },
    alertTitle: { ko: '알림', en: 'Notice', es: 'Aviso', zh: '提示' },
    alertMsg: { ko: '모든 필수 정보를 입력해주세요.', en: 'Please fill all required fields.', es: 'Por favor completa todos los campos requeridos.', zh: '请填写所有必填项。' },
    career: { ko: '경력', en: 'exp.', es: 'exp.', zh: '经验' },
  },
} as const;

export type TranslationKey = keyof typeof translations;
export default translations;
