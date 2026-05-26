import type { Resume } from '../types/resume'

export const resumeData: Resume = {
  basics: {
    name: '吴中江',
    title: '高级 Java 后端工程师',
    city: '上海',
    target: 'Java 后端工程师 / 技术专家',
    contacts: [
      { label: '电话', value: '+86 138-0000-0000', href: 'tel:+8613800000000' },
      { label: '邮箱', value: 'wuzhongjiang@email.com', href: 'mailto:wuzhongjiang@email.com' },
      { label: 'GitHub', value: 'github.com/wuzhongjiang', href: 'https://github.com/wuzhongjiang' },
      { label: '博客', value: 'blog.wzj.dev', href: 'https://blog.wzj.dev' },
    ],
  },
  sections: [
    {
      type: 'summary',
      title: '个人简介',
      content: '5 年 Java 后端开发经验，熟悉分布式系统设计与微服务架构。具备大型电商平台和金融系统的开发实践，擅长高并发场景下的性能优化和问题排查。热爱技术，持续关注业界前沿动态。',
    },
    {
      type: 'experience',
      title: '工作经历',
      items: [
        {
          company: '某某科技有限公司',
          position: '高级 Java 工程师',
          startDate: '2023-01',
          endDate: '至今',
          description: [
            '负责订单中台系统的架构升级，将核心链路响应时间降低 40%',
            '主导微服务拆分和数据库分库分表方案设计，支撑日订单量从 50 万增长至 200 万',
            '引入分布式事务解决方案，解决跨服务数据一致性问题',
            '指导 3 名初级工程师，建立代码评审和自动化测试流程',
          ],
        },
        {
          company: '某某互联网公司',
          position: 'Java 工程师',
          startDate: '2020-03',
          endDate: '2022-12',
          description: [
            '参与电商后台系统的开发与维护，负责商品服务和用户服务模块',
            '使用 Redis 缓存优化热点数据查询，缓存命中率提升至 95%',
            '搭建 ELK 日志监控平台，实现线上问题 5 分钟内定位',
            '参与双 11 大促保障，系统全年可用性 99.99%',
          ],
        },
        {
          company: '某某软件公司',
          position: 'Java 开发工程师',
          startDate: '2018-07',
          endDate: '2020-02',
          description: [
            '参与企业内部管理系统开发，负责审批流引擎和权限模块',
            '基于 Activiti 工作流引擎实现自定义审批流程配置',
            '编写单元测试和集成测试，代码覆盖率保持在 85% 以上',
          ],
        },
      ],
    },
    {
      type: 'education',
      title: '教育背景',
      items: [
        { school: '某某大学', degree: '本科', major: '计算机科学与技术', startDate: '2014-09', endDate: '2018-06' },
      ],
    },
    {
      type: 'skills',
      title: '专业技能',
      groups: [
        { category: '编程语言', skills: ['Java', 'Kotlin', 'Python', 'TypeScript'] },
        { category: '框架与中间件', skills: ['Spring Boot', 'Spring Cloud', 'MyBatis', 'Redis', 'RocketMQ', 'Elasticsearch'] },
        { category: '数据库', skills: ['MySQL', 'PostgreSQL', 'MongoDB', 'TiDB'] },
        { category: 'DevOps', skills: ['Docker', 'Kubernetes', 'Jenkins', 'GitLab CI'] },
      ],
    },
    {
      type: 'projects',
      title: '项目作品',
      content: [
        '开源项目 "EasyJob" — 轻量级分布式任务调度框架，GitHub 2.3k Stars',
        '个人博客系统 — 基于 Spring Boot + Vue 的全栈项目，月 PV 10w+',
      ],
    },
  ],
}
