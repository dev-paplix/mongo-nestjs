import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { SeedService } from '../database/seed.service';

async function runSeedScript() {
  console.log('🌱 Starting data seeding script...');
  
  const app = await NestFactory.createApplicationContext(AppModule);
  const seedService = app.get(SeedService);

  try {
    // Get current stats
    const initialStats = await seedService.getDataStats();
    console.log('📊 Initial data stats:', initialStats);

    // Seed all data
    const result = await seedService.seedAllData(100, 50); // 100 user activities, 50 sales records
    console.log('✅ Seeding completed:', result);

    // Get final stats
    const finalStats = await seedService.getDataStats();
    console.log('📊 Final data stats:', finalStats);

  } catch (error) {
    console.error('❌ Seeding failed:', error);
  } finally {
    await app.close();
    console.log('👋 Script completed');
  }
}

if (require.main === module) {
  runSeedScript();
}