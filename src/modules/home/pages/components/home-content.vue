<template>
  <div class="home-content">
    <div class="home-music">
      <BlogPlayer :audioList="audioList" />
    </div>
    <div class="home-content-center">
      <div class="aside">
        <!-- <aside> -->
          <div class="aside-recommend">
            <BlogPanel>
              <HomeContentAsideRecommend />
            </BlogPanel>
          </div>
          <div style="height: 300px; margin-bottom: 20px">
            <BlogPanel>未开发</BlogPanel>
          </div>
          <div style="height: 300px; margin-bottom: 20px">
            <BlogPanel>未开发</BlogPanel>
          </div>
          <div style="height: 300px; margin-bottom: 20px">
            <BlogPanel>未开发</BlogPanel>
          </div>
        <!-- </aside> -->
      </div>
      <div class="learning-records">
        <BlogLists :toTalLists="toTalList" />
      </div>
    </div>
  </div>
</template>

<script lang='ts' setup>
import '@/assets/svg/home-svg/fonticon/iconfont.css';
import { reactive, ref, onMounted, onUnmounted, computed, onUpdated, watch } from 'vue';
import BlogLists from '@/components/blog-lists/index.vue';
import BlogPlayer from '@/components/blog-player/index.vue';
import BlogPanel from '@/components/blog-panel/index.vue';
import HomeContentAsideRecommend from './home-content-aside-recommend.vue';

// 引入音乐
const unstoppableMusic  = require('@/assets/audio/Sia-Unstoppable.mp3?raw');
const wuMingZhiBeiMusic  = require('@/assets/audio/ChenXueRan-WuMingZhiBei.mp3?raw');
const zombieMusic  = require('@/assets/audio/BadWolves-Zombie.mp3?raw');
const forNightMusic  = require("@/assets/audio/Finneas-Let'sFallinLovefortheNight.mp3?raw");
const loneRangerMusic  = require('@/assets/audio/RachelPlatten-LoneRanger.mp3?raw');
const jinXingMuXingMusic  = require('@/assets/audio/ВаняДмитриенко-JinXingMuXing.mp3?raw');
const liXiangMusic  = require('@/assets/audio/ZhaoLei-LiXiang.mp3?raw');
const komorebiChunYinYueMusic  = require('@/assets/audio/m-taku-Komorebi-ChunYinYue.mp3?raw');

// 引入图片
const siaImg = require('@/assets/img/common/singer-sia.png');
const chenXueRanImg = require('@/assets/img/common/ChenXueRan.jpg');
const zombieImg = require('@/assets/img/common/zombie.webp');
const forNightImg = require('@/assets/img/common/forNight.jpg');
const loneRangerImg = require('@/assets/img/common/loneRanger.jpg');
const jinXingMuXingImg = require('@/assets/img/common/jinXingMuXing.jpg');
const liXiangImg = require('@/assets/img/common/liXiang.jpg');
const komorebiChunYinYueImg = require('@/assets/img/common/komorebiChunYinYue.jpg');

// audioList
const audioList = computed(() => {
  return [
    {
    'audioSrc': unstoppableMusic,
    'title': 'Unstoppable',
    'author': 'Sia',
    'imgSrc': siaImg,
    'lrc': [
        { 'time': '00:00', 'text': "作词 : Sia/Christopher Braide" },
        { 'time': '00:01', 'text': "作曲 : Sia/Christopher Braide" },
        { 'time': '00:02', 'text': "编曲 : Jesse Shatkin" },
        { 'time': '00:11', 'text': "I'll smile I know what it takes to fool this town" },
        { 'time': '00:15', 'text': "I'll do it 'til the sun goes down and all through the night time" },
        { 'time': '00:21', 'text': "Oh yeah oh yeah I'll tell you what you wanna hear" },
        { 'time': '00:26', 'text': "keep my sunglasses on while I shed a tear" },
        { 'time': '00:29', 'text': "It's never the right time yeah" },
        { 'time': '00:33', 'text': "I put my armor on show you how strong I am" },
        { 'time': '00:39', 'text': "I put my armor on I'll show you that I am" },
        { 'time': '00:45', 'text': "I'm unstoppable" },
        { 'time': '00:47', 'text': "I'm a Porsche with no brakes" },
        { 'time': '00:50', 'text': "I'm invincible" },
        { 'time': '00:53', 'text': "Yeah I win every single game" },
        { 'time': '00:55', 'text': "I'm so powerful" },
        { 'time': '00:58', 'text': "I don't need batteries to play" },
        { 'time': '01:01', 'text': "I'm so confident I'm unstoppable today" },
        { 'time': '01:07', 'text': "Unstoppable today I'm unstoppable today" },
        { 'time': '01:13', 'text': "Unstoppable today I'm unstoppable today" },
        { 'time': '01:17', 'text': "I break down only alone I will cry out loud" },
        { 'time': '01:21', 'text': "You'll never see you're hiding out now" },
        { 'time': '01:24', 'text': "Hiding out deep down yeah yeah" },
        { 'time': '01:28', 'text': "I know I've heard that to let your feelings show" },
        { 'time': '01:32', 'text': "Is the only way to make friendships grow" },
        { 'time': '01:35', 'text': "But I'm too afraid now yeah yeah" },
        { 'time': '01:40', 'text': "I put my armor on show you how strong I am" },
        { 'time': '01:45', 'text': "I put my armor on I'll show you that I am" },
        { 'time': '01:51', 'text': "I'm unstoppable" },
        { 'time': '01:53', 'text': "I'm a Porsche with no brakes" },
        { 'time': '01:56', 'text': "I'm invincible" },
        { 'time': '01:59', 'text': "Yeah I win every single game" },
        { 'time': '02:02', 'text': "I'm so powerful" },
        { 'time': '02:04', 'text': "I don't need batteries to play" },
        { 'time': '02:07', 'text': "I'm so confident I'm unstoppable today" },
        { 'time': '02:13', 'text': "Unstoppable today unstoppable today" },
        { 'time': '02:19', 'text': "Unstoppable today I'm unstoppable today" },
        { 'time': '02:24', 'text': "Unstoppable today  unstoppable today" },
        { 'time': '02:30', 'text': "Unstoppable today I'm unstoppable today" },
        { 'time': '02:35', 'text': "I put my armor on show you how strong I am" },
        { 'time': '02:40', 'text': "I put my armor on I'll show you that I am" },
        { 'time': '02:47', 'text': "I'm unstoppable" },
        { 'time': '02:50', 'text': "I'm a Porsche with no brakes" },
        { 'time': '02:53', 'text': "I'm invincible" },
        { 'time': '02:55', 'text': "Yeah I win every single game" },
        { 'time': '02:59', 'text': "I'm so powerful" },
        { 'time': '03:01', 'text': "I don't need batteries to play" },
        { 'time': '03:04', 'text': "I'm so confident I'm unstoppable today" },
        { 'time': '03:10', 'text': "Unstoppable today unstoppable today" },
        { 'time': '03:15', 'text': "Unstoppable today I'm unstoppable today" },
        { 'time': '03:20', 'text': "Unstoppable today unstoppable today" },
        { 'time': '03:26', 'text': "Unstoppable today I'm unstoppable today" },
      ]
    },
    {
    'audioSrc': wuMingZhiBeiMusic,
    'title': '无名之辈',
    'author': '陈雪燃',
    'imgSrc': chenXueRanImg,
    'lrc': [
        {'time': '00:00', 'text': ' 作词 : 唐汉霄' },
        {'time': '00:01', 'text': ' 作曲 : 唐汉霄' },
        {'time': '00:02', 'text': ' 编曲 : 张峰棣' },
        {'time': '00:06', 'text': '城市黎明的灯火' },
        {'time': '00:08', 'text': '总有光环在陨落' },
        {'time': '00:11', 'text': '模仿者一个又一个' },
        {'time': '00:17', 'text': '无人问津的角色' },
        {'time': '00:20', 'text': '你选择去崇拜谁呢 怨恨谁呢' },
        {'time': '00:28', 'text': '假装热情的冷落' },
        {'time': '00:31', 'text': '假装自由的枷锁' },
        {'time': '00:34', 'text': '你最后成为了什么' },
        {'time': '00:39', 'text': '燃烧华丽的烟火' },
        {'time': '00:42', 'text': '绽放一次就足够了  奢求什么' },
        {'time': '00:52', 'text': '无名之辈 我是谁' },
        {'time': '00:55', 'text': '忘了谁 也无所谓' },
        {'time': '00:58', 'text': '谁不是 拼了命走到生命的结尾' },
        {'time': '01:03', 'text': '也许很累一身狼狈' },
        {'time': '01:06', 'text': '也许卑微一生无为' },
        {'time': '01:09', 'text': '也许永远成为不了 你的光辉' },
        {'time': '01:15', 'text': '无名之辈 我是谁' },
        {'time': '01:18', 'text': '忘了谁 也无所谓' },
        {'time': '01:21', 'text': '继续追  谁的光荣不是伴着眼泪' },
        {'time': '01:26', 'text': '也许很累一身狼狈' },
        {'time': '01:29', 'text': '也许卑微一生无为' },
        {'time': '01:32', 'text': '谁生来不都是一样 尽管叫我无名之辈' },
        {'time': '01:44', 'text': '假装热情的冷落' },
        {'time': '01:47', 'text': '假装自由的枷锁' },
        {'time': '01:50', 'text': '你最后成为了什么' },
        {'time': '01:56', 'text': '燃烧华丽的烟火' },
        {'time': '01:58', 'text': '绽放一次就足够了  奢求什么' },
        {'time': '02:10', 'text': '无名之辈 我是谁' },
        {'time': '02:13', 'text': '忘了谁 也无所谓' },
        {'time': '02:16', 'text': '谁不是 拼了命走到生命的结尾' },
        {'time': '02:21', 'text': '也许很累一身狼狈' },
        {'time': '02:24', 'text': '也许卑微一生无为' },
        {'time': '02:27', 'text': '也许永远成为不了 你的光辉 无名之辈' },
        {'time': '03:01', 'text': '无名之辈 我是谁' },
        {'time': '03:04', 'text': '忘了谁 也无所谓' },
        {'time': '03:07', 'text': '谁不是 拼了命走到生命的结尾' },
        {'time': '03:12', 'text': '也许很累一身狼狈' },
        {'time': '03:15', 'text': '也许卑微一生无为' },
        {'time': '03:18', 'text': '也许永远也成为不了谁' },
        {'time': '03:26', 'text': '无名之辈 我是谁' },
        {'time': '03:29', 'text': '忘了谁 也无所谓' },
        {'time': '03:32', 'text': '继续追  谁的光荣不是伴着眼泪' },
        {'time': '03:37', 'text': '也许很累一身狼狈' },
        {'time': '03:40', 'text': '也许卑微一生无为' },
        {'time': '03:43', 'text': '谁生来不都是一样 尽管叫我无名之辈' },
        {'time': '03:56', 'text': '制作人：陈雪燃' },
        {'time': '03:57', 'text': '吉他：牛子健' },
        {'time': '03:58', 'text': '和音：陈雪燃' },
        {'time': '03:59', 'text': '混音&母带：NEM Studios' },
        {'time': '04:00', 'text': '音乐出品发行：华策克顿上海剧酷文化传播有限公司、北京听见时代娱乐传媒有限公司' },
      ],
    },
    {
    'audioSrc': zombieMusic,
    'title': 'Zombie',
    'author': 'Bad Wolves',
    'imgSrc': zombieImg,
    'lrc': [
        { 'time': '00:00', 'text': " 作词 : Dolores O'Riordan" },
        { 'time': '00:01', 'text': " 作曲 : Dolores O'Riordan" },
        { 'time': '00:16', 'text': "Another head hangs lowly" },
        { 'time': '00:21', 'text': "Child is slowly taken" },
        { 'time': '00:29', 'text': "And the violence causes silence" },
        { 'time': '00:34', 'text': "Who are we mistaken" },
        { 'time': '00:39', 'text': "But you see it's not me" },
        { 'time': '00:42', 'text': "It's not my family" },
        { 'time': '00:45', 'text': "In your head in your head they are fighting" },
        { 'time': '00:52', 'text': "With their tanks and their bombs" },
        { 'time': '00:55', 'text': "And their bombs and their drones" },
        { 'time': '00:58', 'text': "In your head in your head they are crying" },
        { 'time': '01:07', 'text': "What's in your head in your head" },
        { 'time': '01:13', 'text': "Zombie zombie zombie-ie-ie" },
        { 'time': '01:20', 'text': "What's in your head in your head" },
        { 'time': '01:26', 'text': "Zombie zombie zombie-ie-ie-ie oh" },
        { 'time': '01:34', 'text': "Another mother's breakin'" },
        { 'time': '01:39', 'text': "Heart is takin' over" },
        { 'time': '01:46', 'text': "When the violence causes silence" },
        { 'time': '01:52', 'text': "We must be mistaken" },
        { 'time': '01:57', 'text': "It's the same old theme" },
        { 'time': '02:00', 'text': "In two thousand eighteen" },
        { 'time': '02:03', 'text': "In your head in your head they're still fightin'" },
        { 'time': '02:10', 'text': "With their tanks and their bombs" },
        { 'time': '02:13', 'text': "And their guns and their drones" },
        { 'time': '02:16', 'text': "In your head in your head they are dyin'" },
        { 'time': '02:22', 'text': "What's in your head in your head" },
        { 'time': '02:28', 'text': "Zombie zombie zombie-ie-ie" },
        { 'time': '02:35', 'text': "What's in your head in your head" },
        { 'time': '02:41', 'text': "Zombie zombie zombie-ie-ie oh" },
        { 'time': '03:12', 'text': "It's the same old theme" },
        { 'time': '03:15', 'text': "In two thousand eight-teen" },
        { 'time': '03:18', 'text': "In your head in your head they're dyin'" },
        { 'time': '03:24', 'text': "What's in your head in your head" },
        { 'time': '03:31', 'text': "Zombie zombie zombie-ie-ie" },
        { 'time': '03:37', 'text': "What's in your head in your head" },
        { 'time': '03:43', 'text': "Zombie zombie zombie-ie-ie oh" },
      ],
    },
    {
    'audioSrc': forNightMusic,
    'title': "Let's Fall in Love for the Night",
    'author': 'Finneas',
    'imgSrc': forNightImg,
    'lrc': [
        { 'time': '00:00', 'text': " 作词 : FINNEAS" },
        { 'time': '00:00', 'text': " 作曲 : FINNEAS" },
        { 'time': '00:01', 'text': "Let's fall in love for the night" },
        { 'time': '00:04', 'text': "And forget in the morning" },
        { 'time': '00:08', 'text': "Play me a song that you like" },
        { 'time': '00:11', 'text': "You can bet I'll know every line" },
        { 'time': '00:17', 'text': "I'm the boy that your boy hoped that you would avoid" },
        { 'time': '00:21', 'text': "Don't waste your eyes on jealous guys, **** that noise" },
        { 'time': '00:25', 'text': "I know better than to call you mine" },
        { 'time': '00:33', 'text': "You need a pick me up" },
        { 'time': '00:37', 'text': "I'll be there in twenty five" },
        { 'time': '00:40', 'text': "I like to push my luck" },
        { 'time': '00:44', 'text': "So take my hand, let's take a drive" },
        { 'time': '00:48', 'text': "I've been living in the future" },
        { 'time': '00:52', 'text': "Hoping I might see you sooner" },
        { 'time': '00:56', 'text': "I want you, riding shotgun I knew" },
        { 'time': '00:59', 'text': "When I got one right" },
        { 'time': '01:03', 'text': "Let's fall in love for the night" },
        { 'time': '01:06', 'text': "And forget in the morning" },
        { 'time': '01:10', 'text': "Play me a song that you like" },
        { 'time': '01:13', 'text': "You can bet I'll know every line" },
        { 'time': '01:19', 'text': "I'm the boy that your boy hoped that you would avoid" },
        { 'time': '01:23', 'text': "Don't waste your eyes on jealous guys, **** that noise" },
        { 'time': '01:27', 'text': "I know better than to call you mine" },
        { 'time': '01:34', 'text': "I love it when you talk that nerdy ****" },
        { 'time': '01:37', 'text': "We're in our twenties talking thirties ****" },
        { 'time': '01:41', 'text': "We're making money but we're saving it" },
        { 'time': '01:44', 'text': "'Cause talking **** is cheap and we talk a lot of it" },
        { 'time': '01:49', 'text': "You won't stay with me, I know" },
        { 'time': '01:52', 'text': "But you can have your way with me until you go" },
        { 'time': '01:56', 'text': "And before your kisses turn into bruises, I am a warning" },
        { 'time': '02:03', 'text': "Let's fall in love for the night" },
        { 'time': '02:06', 'text': "And forget in the morning" },
        { 'time': '02:13', 'text': "Play me a song that you like" },
        { 'time': '02:17', 'text': "You can bet I'll know every line" },
        { 'time': '02:25', 'text': "Cause I'm the boy that your boy hoped that you would avoid" },
        { 'time': '02:33', 'text': "Don't waste your eyes on jealous guys, **** that noise" },
        { 'time': '02:43', 'text': "I know better, I know better" },
        { 'time': '02:51', 'text': "I know better than to ever call you mine" },
      ],
    },
    {
    'audioSrc': loneRangerMusic,
    'title': 'Lone Ranger',
    'author': 'Rachel Platten',
    'imgSrc': loneRangerImg,
    'lrc': [
        { 'time': '00:00', 'text': " 作词 : Rachel Platten" },
        { 'time': '00:01', 'text': " 作曲 : Rachel Platten" },
        { 'time': '00:08', 'text': "Maybe I'm selfish, call me see through" },
        { 'time': '00:10', 'text': "But I'm debating if I really need to" },
        { 'time': '00:12', 'text': "Tie down to someone forever" },
        { 'time': '00:14', 'text': "Sure I get lonely sometimes, I miss being together" },
        { 'time': '00:16', 'text': "But, hey!, when I roam from city to city" },
        { 'time': '00:18', 'text': "Let the highway and the crowds, and the hunger that's in me" },
        { 'time': '00:20', 'text': "Fill me up with fireworks and tell me I'm skinny" },
        { 'time': '00:22', 'text': "Soak up the fire and the buzz they give me" },
        { 'time': '00:24', 'text': "Oo oo oo oo oo" },
        { 'time': '00:28', 'text': "Long nights, stay up late" },
        { 'time': '00:30', 'text': "Drink the sky, meditate" },
        { 'time': '00:32', 'text': "Oo oo oo oo oo" },
        { 'time': '00:36', 'text': "Open eyes, sunroof" },
        { 'time': '00:38', 'text': "Give me miles  , give me truth" },
        { 'time': '00:42', 'text': "Sometimes I get high, sometimes I get low" },
        { 'time': '00:46', 'text': "But I'm calm as can be in a room full of strangers" },
        { 'time': '00:50', 'text': "But oh my, don't try to get close" },
        { 'time': '00:54', 'text': "I'm just gonna leave, 'cause baby I'm a lone ranger" },
        { 'time': '00:59', 'text': "Na na na na na, na na na na na na, na na na na na na" },
        { 'time': '01:05', 'text': "I'm a lone ranger" },
        { 'time': '01:07', 'text': "I'm a lion, I'm a tiger" },
        { 'time': '01:09', 'text': "I'm a caged bird, I'm on fire" },
        { 'time': '01:11', 'text': "Got these paper wings, but they don't hold the air" },
        { 'time': '01:13', 'text': "Get so close to somebody but I don't stay there" },
        { 'time': '01:15', 'text': "Much less brave than I admit" },
        { 'time': '01:17', 'text': "Much more scared than they all think" },
        { 'time': '01:20', 'text': "But I'm protecting this organ in my chest" },
        { 'time': '01:21', 'text': "'Cause the blood sweat and tears they can make quite a mess" },
        { 'time': '01:24', 'text': "Oo oo oo oo oo" },
        { 'time': '01:28', 'text': "Open eyes, open roof" },
        { 'time': '01:30', 'text': "Give me miles, give me truth" },
        { 'time': '01:33', 'text': "Sometimes I get high, sometimes I get low" },
        { 'time': '01:38', 'text': "But I'm calm as can be in a room full of strangers" },
        { 'time': '01:42', 'text': "But oh my, don't try to get close" },
        { 'time': '01:46', 'text': "I'm just gonna leave, 'cause baby I'm a lone ranger" },
        { 'time': '01:51', 'text': "Na na na na na, na na na na na na, na na na na na na" },
        { 'time': '01:56', 'text': "'Cause baby I'm a lone ranger" },
        { 'time': '01:59', 'text': "I don't wanna get broken baby" },
        { 'time': '02:01', 'text': "I don't wanna get broken baby" },
        { 'time': '02:03', 'text': "I don't wanna get broken baby" },
        { 'time': '02:04', 'text': "Cut open baby, cut open baby" },
        { 'time': '02:07', 'text': "I don't wanna get broken baby" },
        { 'time': '02:09', 'text': "I don't wanna get broken baby" },
        { 'time': '02:11', 'text': "I don't wanna get broken baby" },
        { 'time': '02:12', 'text': "Cut open baby, cut open baby" },
        { 'time': '02:24', 'text': "Sometimes I get high, sometimes I get low" },
        { 'time': '02:29', 'text': "But I'm calm as can be in a room full of strangers" },
        { 'time': '02:33', 'text': "But oh my, don't try to get close" },
        { 'time': '02:37', 'text': "I'm just gonna leave, 'cause baby I'm a lone ranger" },
        { 'time': '02:41', 'text': "Na na na na na, na na na na na na, na na na na na na" },
        { 'time': '02:49', 'text': "Sometimes I get high" },
        { 'time': '02:51', 'text': "Na na na na na, na na na na na na, na na na na na na" },
        { 'time': '02:55', 'text': "'Cause baby I'm a lone ranger" },
        { 'time': '02:58', 'text': "But oh my, don't try to get close" },
        { 'time': '03:02', 'text': "I'm just gonna leave, 'cause baby I'm a lone ranger" },
      ],
    },
    {
    'audioSrc': jinXingMuXingMusic,
    'title': 'Венера-Юпитер',
    'author': 'Ваня Дмитриенко',
    'imgSrc': jinXingMuXingImg,
    'lrc': [
        { 'time': '00:00', 'text': "作词 : Артём Шаповалов" },
        { 'time': '00:00', 'text': "作曲 : Артём Шаповалов" },
        { 'time': '00:00', 'text': "Ты Венера — я Юпитер" },
        { 'time': '00:02', 'text': "Ты Москва, я Питер" },
        { 'time': '00:03', 'text': "Люди, помогите дышать" },
        { 'time': '00:06', 'text': "Ты Венера — я Юпитер" },
        { 'time': '00:08', 'text': "Ты Москва, я Питер" },
        { 'time': '00:10', 'text': "На одной орбите опять" },
        { 'time': '00:14', 'text': "Ты Венера — я Юпитер" },
        { 'time': '00:15', 'text': "Ты Москва, я Питер" },
        { 'time': '00:17', 'text': "Люди, помогите дышать" },
        { 'time': '00:20', 'text': "Ты Венера — я Юпитер" },
        { 'time': '00:22', 'text': "Ты Москва, я Питер" },
        { 'time': '00:24', 'text': "На одной орбите опять" },
        { 'time': '00:27', 'text': "По пятам друг за другом ходим" },
        { 'time': '00:31', 'text': "Как ты там, в моём телефоне" },
        { 'time': '00:34', 'text': "Неспроста, не подобрать пароли" },
        { 'time': '00:38', 'text': "К твоему сердцу что ли" },
        { 'time': '00:39', 'text': "Скажу 'Спасибо' городам" },
        { 'time': '00:41', 'text': "Что не разделили нас" },
        { 'time': '00:43', 'text': "Зачем мне быть отдельно от тебя" },
        { 'time': '00:45', 'text': "Ведь, я так не хочу сейчас" },
        { 'time': '00:47', 'text': "Может эту песню" },
        { 'time': '00:48', 'text': "Никогда ты не услышишь" },
        { 'time': '00:50', 'text': "Но я вновь на нашей крыше" },
        { 'time': '00:52', 'text': "Вспоминаю, как ты дышишь" },
        { 'time': '00:54', 'text': "(Как же ты дышишь)" },
        { 'time': '00:54', 'text': "Ты Венера — я Юпитер" },
        { 'time': '00:56', 'text': "Ты Москва — я Питер" },
        { 'time': '00:58', 'text': "Люди, помогите дышать" },
        { 'time': '01:01', 'text': "Ты Венера — я Юпитер" },
        { 'time': '01:03', 'text': "Ты Москва — я Питер" },
        { 'time': '01:05', 'text': "На одной орбите опять" },
        { 'time': '01:08', 'text': "А, может быть, счастья нам не найти, и" },
        { 'time': '01:12', 'text': "Если честно, ты не моя невеста" },
        { 'time': '01:15', 'text': "Но так много пути с тобой мы прошли" },
        { 'time': '01:18', 'text': "Чтобы найти свое место вместе" },
        { 'time': '01:22', 'text': "Ты Венера — я Юпитер" },
        { 'time': '01:24', 'text': "Ты Москва — я Питер" },
        { 'time': '01:26', 'text': "Люди, помогите дышать" },
        { 'time': '01:29', 'text': "Ты Венера — я Юпитер" },
        { 'time': '01:31', 'text': "Ты Москва — я Питер" },
        { 'time': '01:32', 'text': "На одной орбите опять" },
        { 'time': '01:36', 'text': "Ты Венера — я Юпитер" },
        { 'time': '01:38', 'text': "Ты Москва — я Питер" },
        { 'time': '01:39', 'text': "Люди, помогите дышать" },
        { 'time': '01:42', 'text': "Ты Венера, я Юпитер" },
        { 'time': '01:44', 'text': "Ты Москва, я Питер" },
        { 'time': '01:46', 'text': "На одной орбите опять" },
        { 'time': '01:49', 'text': "Ты Венера — я Юпитер" },
        { 'time': '01:51', 'text': "Ты Москва — я Питер" },
        { 'time': '01:53', 'text': "Люди, помогите дышать" },
        { 'time': '01:56', 'text': "Ты Венера — я Юпитер" },
        { 'time': '01:58', 'text': "Ты Москва — я Питер" },
        { 'time': '02:00', 'text': "На одной орбите опять" },
      ],
    },
    {
    'audioSrc': liXiangMusic,
    'title': '理想',
    'author': '赵雷',
    'imgSrc': liXiangImg,
    'lrc': [
        { 'time': '00:00', 'text': ' 作词 : 赵雷' },
        { 'time': '00:01', 'text': ' 作曲 : 赵雷' },
        { 'time': '00:35', 'text': '一个人住在这城市' },
        { 'time': '00:38', 'text': '为了填饱肚子就已精疲力尽' },
        { 'time': '00:42', 'text': '还谈什么理想' },
        { 'time': '00:45', 'text': '那是我们的美梦' },
        { 'time': '00:52', 'text': '梦醒后 还是依然奔波在风雨的街头' },
        { 'time': '00:59', 'text': '有时候想哭就把泪 咽进一腔热血的胸口' },
        { 'time': '01:08', 'text': '公车上我睡过了车站' },
        { 'time': '01:17', 'text': '一路上我望着霓虹的北京' },
        { 'time': '01:25', 'text': '我的理想把我丢在这个拥挤的人潮' },
        { 'time': '01:32', 'text': '车窗外已经是一片白雪茫茫' },
        { 'time': '01:40', 'text': '又一个四季在轮回' },
        { 'time': '01:44', 'text': '而我一无所获的坐在街头' },
        { 'time': '01:49', 'text': '只有理想在支撑着那些麻木的血肉' },
        { 'time': '01:57', 'text': '理想今年你几岁' },
        { 'time': '02:01', 'text': '你总是诱惑着年轻的朋友' },
        { 'time': '02:06', 'text': '你总是谢了又开 给我惊喜' },
        { 'time': '02:10', 'text': '又让我沉入失望的生活里' },
        { 'time': '02:56', 'text': '公车上我睡过了车站' },
        { 'time': '03:04', 'text': '一路上我望着霓虹的北京' },
        { 'time': '03:13', 'text': '我的理想把我丢在这个拥挤的人潮' },
        { 'time': '03:20', 'text': '车窗外已经是一片白雪茫茫' },
        { 'time': '03:28', 'text': '又一个四季在轮回' },
        { 'time': '03:31', 'text': '而我一无所获的坐在街头' },
        { 'time': '03:36', 'text': '只有理想在支撑着那些麻木的血肉' },
        { 'time': '03:44', 'text': '理想今年你几岁' },
        { 'time': '03:49', 'text': '你总是诱惑着年轻的朋友' },
        { 'time': '03:53', 'text': '你总是谢了又开 给我惊喜' },
        { 'time': '03:57', 'text': '又让我沉入失望的生活里' },
        { 'time': '04:01', 'text': '又一个年代在变换' },
        { 'time': '04:05', 'text': '我已不是无悔的那个青年' },
        { 'time': '04:10', 'text': '青春被时光抛弃' },
        { 'time': '04:13', 'text': '已是当父亲的年纪' },
        { 'time': '04:18', 'text': '理想永远都年轻' },
        { 'time': '04:22', 'text': '你让我倔强地反抗着命运' },
        { 'time': '04:27', 'text': '你让我变得苍白' },
        { 'time': '04:29', 'text': '却依然天真的相信花儿会再次的盛开' },
        { 'time': '04:48', 'text': '阳光之中 到处可见奔忙的人们' },
        { 'time': '04:56', 'text': '被拥挤着 被一晃而飞的光阴忽略过' },
      ],
    },
    {
    'audioSrc': komorebiChunYinYueMusic,
    'title': 'Komorebi (叶隙间洒落的阳光)',
    'author': 'm-taku',
    'imgSrc': komorebiChunYinYueImg,
    'lrc': [
        { 'time': '00:00', 'text': '纯音乐，请欣赏' },
      ],
    }
  ]
})
// homeLists数据
const toTalList = computed(() => {
  return Array.from({ length: 31 }).map((_, i) => ({
    id: i,
    img: '',
    title: `${i+1}Hide on bush`,
    text: `${i+1}李相赫（游戏ID：Faker），绰号“大魔王”，1996年5月7日出生于韩国，
    《英雄联盟》职业选手，司职中单，是国际电子竞技俱乐部T1英雄联盟分部的队员之一。 [1] 
    2013年2月，李相赫被招入SKTelecom T1#2队，该队伍于2013年11月更名为SKTelecom T1 K队， 
    [97]  2015年，SKTelecom T1 K与SKTelecom T1 S队伍合并为SKTelecom T1。 [1]  
    2019年2月，SKTelecom T1官宣正式更名为T1，其中英雄联盟分部则在2020LCK春季赛开始正式更名。 [117] `,
    label: Array.from({ length: 4 }).map((_, i) => ([`vscode${i}`, `vue${i}`, `css${i}`, `js${i}`])),
    time: '2022/3/28',
  }))
})

onMounted(() => {
});

defineExpose({
});
</script>

<script lang='ts'>
export default { name: '' };

</script>

<style lang='scss'>
.home-content {
  display: flex;
  flex-direction: column;
  align-items: center;

  .home-music {
    width: 40%;
    margin: 20px 0;
  }
  .home-content-center {
    width: 82%;
    display: flex;
    justify-content: space-between;
    .aside {
      width: 30%;
      margin-right: 20px;
      .aside-recommend {
        min-height: 300px;
        margin-bottom: 20px;
      }
    }
    .learning-records {
      flex: 1;
      // width: 70%;
    }
  }
}
</style>
