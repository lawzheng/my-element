<template>
  <div style="display: flex;justify-content: space-between;">
    <m-menu
      :data="data1"
      default-active="3-1"
      :router="false"
      name="a"
      index="b"
      icon="c"
      children="d"
      style="width: 200px"
    >
      1
    </m-menu>
    <m-infinite-menu
      :data="data2"
      default-active="3-1-1-1-1"
      :router="false"
      name="a"
      index="b"
      icon="c"
      children="d"
      style="width: 200px"
    />
  </div>
</template>

<script setup lang='ts'>
const data1 = [
  {
    a: '导航1',
    b: '1',
    c: 'Document'
  },
  {
    a: '导航2',
    b: '2',
    c: 'Document'
  },
  {
    a: '导航3',
    b: '3',
    c: 'Document',
    d: [
      {
        a: '导航3-1',
        b: '3-1',
        c: 'Document',
      }
    ]
  }
]
const data2 = [
  {
    a: '导航1',
    b: '1',
    c: 'Document'
  },
  {
    a: '导航2',
    b: '2',
    c: 'Document'
  },
  {
    a: '导航3',
    b: '3',
    c: 'Document',
    d: [
      {
        a: '导航3-1',
        b: '3-1',
        c: 'Document',
        d: [
          {
            a: '导航3-1-1',
            b: '3-1-1',
            c: 'Document',
            d: [
              {
                a: '导航3-1-1-1',
                b: '3-1-1-1',
                c: 'Document',
                d: [
                  {
                    a: '导航3-1-1-1-1',
                    b: '3-1-1-1-1',
                    c: 'Document',
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  }
]
</script>

<style lang='scss' scoped>

</style>