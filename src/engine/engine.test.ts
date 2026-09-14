/**
 * Momentum AI 2.0 Engine Verification Suite
 * Tests deterministic behavior of core execution modules.
 */
import { GoalCompiler } from './GoalCompiler';
import { MissionCompressor } from './MissionCompressor';
import { FrictionRadar } from './FrictionRadar';
import { RecoveryEngine } from './RecoveryEngine';
import { RealityTwinEngine } from './RealityTwinEngine';

function runTests() {
  console.log('🧪 Starting Momentum AI 2.0 Engine Test Suite...');
  let passed = 0;
  let total = 0;

  function assert(condition: boolean, testName: string) {
    total++;
    if (condition) {
      console.log(`  ✅ PASS: ${testName}`);
      passed++;
    } else {
      console.error(`  ❌ FAIL: ${testName}`);
      throw new Error(`Test failed: ${testName}`);
    }
  }

  // 1. Goal Compiler Test
  console.log('\n--- 1. Testing GoalCompiler ---');
  const compiled = GoalCompiler.compile('Crack Technical Coding Interview in 30 Days', 30);
  assert(compiled.goal.title.includes('Coding Interview'), 'GoalCompiler extracted meaningful title');
  assert(compiled.goal.milestones.length >= 3, 'GoalCompiler generated multiple milestone stages');
  assert(compiled.initialMission.tasks.length >= 2, 'GoalCompiler generated immediate actionable tasks');
  const oneThing = compiled.initialMission.tasks.find(t => t.isOneThing);
  assert(!!oneThing, 'GoalCompiler isolated Today\'s "The One Thing"');

  // 2. Mission Auto-Compression Test
  console.log('\n--- 2. Testing MissionCompressor ---');
  const compressed10 = MissionCompressor.compress(compiled.initialMission, 10);
  assert(compressed10.status === 'adapted', 'Mission marked as adapted');
  assert(compressed10.targetDurationMinutes <= 15, 'Mission duration compressed to target budget');
  const compressedOneThing = compressed10.tasks.find(t => t.isOneThing);
  assert(!!compressedOneThing, 'Compressed mission protected The One Thing');

  // 5-Minute Extreme Micro Mode Test
  const compressed5 = MissionCompressor.compress(compiled.initialMission, 5);
  assert(compressed5.targetDurationMinutes === 5, '5-minute micro mode compressed to 5 minutes');
  assert(compressed5.tasks.length === 1, '5-minute mode focused strictly on 1 atomic action');

  // 3. Friction Radar Test
  console.log('\n--- 3. Testing FrictionRadar ---');
  const targetTask = compiled.initialMission.tasks[0];
  const frictionDiagnosis = FrictionRadar.diagnose(compiled.initialMission, targetTask, 'too_difficult');
  assert(frictionDiagnosis.log.reason === 'too_difficult', 'Friction log recorded correct reason');
  assert(frictionDiagnosis.adaptedTasks.length >= 3, 'Too difficult task deconstructed into guided micro-actions');

  // 4. Momentum Recovery & Reset Test
  console.log('\n--- 4. Testing RecoveryEngine ---');
  const resetResult = RecoveryEngine.executeReset(compiled.goal, 'less_time');
  assert(resetResult.updatedGoal.healthStatus === 'recalibrating', 'Goal marked as recalibrating');
  assert(resetResult.recoveryMission.targetDurationMinutes === 15, 'Recovery mission set to gentle 15 minutes');
  assert(!resetResult.recoverySummary.includes('streak broken'), 'Recovery messaging is strictly zero-shame');

  // 5. Reality Twin Engine Test
  console.log('\n--- 5. Testing RealityTwinEngine ---');
  const twin = RealityTwinEngine.computeProfile(60, [
    { minutes: 35, completed: true, timestamp: new Date().toISOString() },
    { minutes: 40, completed: true, timestamp: new Date().toISOString() }
  ], []);
  assert(twin.intendedDailyMinutes === 60, 'Preserved intended capacity');
  assert(twin.observedDailyMinutes === 38 || twin.observedDailyMinutes === 37, 'Computed accurate observed capacity');
  assert(twin.sweetSpotDurationMinutes <= 40, 'Identified realistic execution sweet spot');

  console.log(`\n🎉 All ${passed}/${total} Engine Tests Passed Successfully!`);
}

runTests();
