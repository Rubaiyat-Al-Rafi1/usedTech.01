import pool from '../config/database';
import bcrypt from 'bcryptjs';

async function seed() {
  try {
    console.log('Seeding database...');

    // Create admin user
    const adminPassword = await bcrypt.hash('admin123', 12);
    await pool.query(`
      INSERT INTO users (name, email, password_hash, role, verified, location)
      VALUES ('Admin User', 'admin@usedtech.com', $1, 'admin', true, 'San Francisco, CA')
      ON CONFLICT (email) DO NOTHING
    `, [adminPassword]);

    // Create test users
    const userPassword = await bcrypt.hash('password123', 12);
    const users = [
      ['John Electronics', 'john@example.com', 'San Francisco, CA', 4.8, 127],
      ['Sarah Tech', 'sarah@example.com', 'Austin, TX', 4.9, 89],
      ['Mike Components', 'mike@example.com', 'Seattle, WA', 4.6, 203],
    ];

    for (const [name, email, location, rating, totalSales] of users) {
      await pool.query(`
        INSERT INTO users (name, email, password_hash, location, rating, total_sales, verified)
        VALUES ($1, $2, $3, $4, $5, $6, true)
        ON CONFLICT (email) DO NOTHING
      `, [name, email, userPassword, location, rating, totalSales]);
    }

    // Create categories
    const categories = [
      {
        name: 'Microcontrollers',
        slug: 'microcontrollers',
        description: 'Arduino, ESP, Raspberry Pi and development boards',
        icon: 'Cpu',
        image_url: 'https://images.pexels.com/photos/163100/circuit-circuit-board-resistor-computer-163100.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&dpr=1',
        subcategories: [
          { name: 'Arduino Boards', slug: 'arduino-boards', description: 'Arduino Uno, Nano, Mega and compatible boards' },
          { name: 'ESP Modules', slug: 'esp-modules', description: 'ESP8266, ESP32 development boards and modules' },
          { name: 'Raspberry Pi', slug: 'raspberry-pi', description: 'Raspberry Pi boards, Zero, and accessories' },
          { name: 'STM32 Boards', slug: 'stm32-boards', description: 'STM32 development boards and modules' },
        ]
      },
      {
        name: 'Motors & Drivers',
        slug: 'motors-drivers',
        description: 'Servo motors, stepper motors, and motor drivers',
        icon: 'Settings',
        image_url: 'https://images.pexels.com/photos/442150/pexels-photo-442150.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&dpr=1',
        subcategories: [
          { name: 'Servo Motors', slug: 'servo-motors', description: 'Standard and micro servo motors' },
          { name: 'Stepper Motors', slug: 'stepper-motors', description: 'NEMA 17, NEMA 23 stepper motors' },
          { name: 'DC Motors', slug: 'dc-motors', description: 'Brushed and brushless DC motors' },
          { name: 'Motor Drivers', slug: 'motor-drivers', description: 'H-bridge, stepper, and servo drivers' },
        ]
      },
      {
        name: 'Sensors',
        slug: 'sensors',
        description: 'Temperature, humidity, motion, and environmental sensors',
        icon: 'Radar',
        image_url: 'https://images.pexels.com/photos/163100/circuit-circuit-board-resistor-computer-163100.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&dpr=1',
        subcategories: [
          { name: 'Temperature Sensors', slug: 'temperature-sensors', description: 'DHT22, DS18B20, thermocouples' },
          { name: 'Motion Sensors', slug: 'motion-sensors', description: 'PIR, ultrasonic, accelerometers' },
          { name: 'Environmental', slug: 'environmental-sensors', description: 'Air quality, pressure, light sensors' },
        ]
      },
    ];

    for (const category of categories) {
      const categoryResult = await pool.query(`
        INSERT INTO categories (name, slug, description, icon, image_url)
        VALUES ($1, $2, $3, $4, $5)
        ON CONFLICT (slug) DO UPDATE SET
          name = EXCLUDED.name,
          description = EXCLUDED.description,
          icon = EXCLUDED.icon,
          image_url = EXCLUDED.image_url
        RETURNING id
      `, [category.name, category.slug, category.description, category.icon, category.image_url]);

      const categoryId = categoryResult.rows[0].id;

      // Create subcategories
      for (const subcategory of category.subcategories) {
        await pool.query(`
          INSERT INTO subcategories (category_id, name, slug, description)
          VALUES ($1, $2, $3, $4)
          ON CONFLICT (category_id, slug) DO UPDATE SET
            name = EXCLUDED.name,
            description = EXCLUDED.description
        `, [categoryId, subcategory.name, subcategory.slug, subcategory.description]);
      }
    }

    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Seeding failed:', error);
    process.exit(1);
  }
}

seed();